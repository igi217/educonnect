import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Follower from 'App/Models/Follower';
import Notification from 'App/Models/Notification';
import Topic from 'App/Models/Topic'
import User from 'App/Models/User';
import UserTopic from 'App/Models/UserTopic';
import CreateProjectValidator from 'App/Validators/CreateProjectValidator';
import { string } from "@ioc:Adonis/Core/Helpers"
import Project from 'App/Models/Project';
import ProjectImage from 'App/Models/ProjectImage';
import ProjectUpvote from 'App/Models/ProjectUpvote';
export default class HomeController {
    public async index({ view, auth }: HttpContextContract) {
        let topics = await Topic.query().orderBy("name", "asc");
        let users = await User.query().whereNot('id', auth.user?.id!).withCount('followers', (query) => {
            query.where('follower_id', auth.user?.id!).as('following')
        }).orderBy('id', 'desc');
        let projects = await Project.query().preload('files').preload('topic').preload('user').orderBy('id', 'desc').withCount('upvotes').withCount('upvotes', (query) => {
            query.where('user_id', auth.user?.id!).as('upvoted')
        });
        let userFollowerCount = (await Follower.query().where('follower_id', auth.user?.id!)).length;
        let userFollowingCount = (await Follower.query().where('following_id', auth.user?.id!)).length;

        let userTopics = await UserTopic.query().preload('topic').orderBy('id', 'desc');


        return view.render('client/dashboard', { topics, users, userTopics, userFollowerCount, userFollowingCount, projects })
    }
    public async search({ view, auth, request }: HttpContextContract) {
        let search = request.body().search;

        let topics = await Topic.query().orderBy("name", "asc");
        let users = await User.query().whereNot('id', auth.user?.id!).withCount('followers', (query) => {
            query.where('follower_id', auth.user?.id!).as('following')
        }).orderBy('id', 'desc');
        let projects = await Project.query().whereILike('title', `%${search}%`).preload('files').preload('topic').preload('user').orderBy('id', 'desc').withCount('upvotes').withCount('upvotes', (query) => {
            query.where('user_id', auth.user?.id!).as('upvoted')
        });
        let userFollowerCount = (await Follower.query().where('follower_id', auth.user?.id!)).length;
        let userFollowingCount = (await Follower.query().where('following_id', auth.user?.id!)).length;

        let userTopics = await UserTopic.query().preload('topic').orderBy('id', 'desc');


        return view.render('client/dashboard', { topics, users, userTopics, userFollowerCount, userFollowingCount, projects })
    }
    public async projectByTopic({ view, auth, request }: HttpContextContract) {
        let topicId = request.param('id')
        let topics = await Topic.query().orderBy("name", "asc");
        let users = await User.query().whereNot('id', auth.user?.id!).withCount('followers', (query) => {
            query.where('follower_id', auth.user?.id!).as('following')
        }).orderBy('id', 'desc');
        let projects = await Project.query().where('topic_id', topicId).preload('files').preload('topic').preload('user').orderBy('id', 'desc').withCount('upvotes').withCount('upvotes', (query) => {
            query.where('user_id', auth.user?.id!).as('upvoted')
        });
        let userFollowerCount = (await Follower.query().where('follower_id', auth.user?.id!)).length;
        let userFollowingCount = (await Follower.query().where('following_id', auth.user?.id!)).length;

        let userTopics = await UserTopic.query().preload('topic').orderBy('id', 'desc');


        return view.render('client/topicfilter', { topics, users, userTopics, userFollowerCount, userFollowingCount, projects, topicId })
    }
    public async seenAll({ auth, response }: HttpContextContract) {
        await Notification.query().where('user_id', auth.user?.id!).update({
            seen: true
        })

        return response.json({ status: true })
    }

    public async addProject({ view }) {
        let topics = await Topic.query().orderBy('name', 'asc');
        return view.render('client/project/create', { topics })
    }
    public async project({ request, view, auth }: HttpContextContract) {
        let id = request.param('id');
        let project = await Project.query().where('id', id).preload('user').preload('files').withCount('upvotes').withCount('upvotes', (query) => {
            query.where('user_id', auth.user?.id!).as('upvoted')
        }).first();
        let others = await Project.query().preload('user').orderBy('id', 'desc');
        return view.render('client/project/details', { project, others })
    }
    public async createProject({ request, response, auth }: HttpContextContract) {
        let project = new Project();
        let payload = await request.validate(CreateProjectValidator);
        let files = request.files('files');
        let projectFiles: { path: string, projectId: number, name: string }[] = [];
        let imageName = string.generateRandom(30) + "." + payload.image.extname;
        await payload.image.move("./public/uploads/project", { name: imageName });

        project.merge({ ...payload, image: imageName, slug: string.toSlug(payload.title), userId: auth.user?.id })
        await project.save();


        for (let file of files) {
            let fileName = string.generateRandom(30) + "." + file.extname;
            await file.move('./public/uploads/project', { name: fileName });
            projectFiles.push({ path: fileName, projectId: project.id, name: file.clientName })
        }

        await ProjectImage.createMany(projectFiles);

        return response.redirect().toRoute('client.dashboard');
    }

    public async upvote({ request, response, auth }: HttpContextContract) {
        let id = request.param('id')
        let upvoteExists = await ProjectUpvote.query().where('user_id', auth.user?.id!).where('project_id', id).first();
        let project = await Project.find(id);
        if (upvoteExists) {
            await upvoteExists.delete();
        } else {
            await Notification.create({
                text: `${auth.user?.fullName} Upvoted your project "${project?.title}"`,
                userId: project?.userId,
                link: `/project/${project?.slug}/${project?.id}`
            })
            await ProjectUpvote.create({
                projectId: id,
                userId: auth.user?.id
            })
        }

        return response.redirect().back();
    }

    public async logout({ response, auth }: HttpContextContract) {
        await auth.use('web').logout()

        return response.redirect().back()
    }
}
