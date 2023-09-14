import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import CreateAccountValidator from 'App/Validators/CreateAccountValidator';
import UpdateAcademyValidator from 'App/Validators/UpdateAcademyValidator';
import { string } from "@ioc:Adonis/Core/Helpers"
import UpdateImageValidator from 'App/Validators/UpdateImageValidator';
import Topic from 'App/Models/Topic';
import UpdateTopicValidator from 'App/Validators/UpdateTopicValidator';
import UserTopic from 'App/Models/UserTopic';
import UpdateSocialValidator from 'App/Validators/UpdateSocialValidator';
import Notification from 'App/Models/Notification';
export default class AuthController {
    public async login({ view }: HttpContextContract) {

        return view.render("client/login");
    }

    public async loginPost({ request, response, auth, session }: HttpContextContract) {

        let body = request.body();

        try {
            await auth.use("web").attempt(body.email, body.password, true)
            return response.redirect().toRoute("client.dashboard");
        } catch (error) {
            console.log(error)
            session.flash({ formerror: "Invalid email or password" })
            return response.redirect().back()
        }
    }

    public async register({ view }: HttpContextContract) {
        return view.render("client/register")
    }

    public async registerPost({ request, response }: HttpContextContract) {
        let payload = await request.validate(CreateAccountValidator);

        let user = new User();
        user.merge(payload)
        await user.save();

        await Notification.create({
            text: `Hi, ${user.fullName} ! Welcome to Educonnect. Have a very happy journey!`,
            userId: user.id
        })

        return response.redirect().toRoute('client.updateAcademy', { id: user.id });
    }

    public async updateAcademy({ view, request }: HttpContextContract) {
        let id = request.param('id')
        return view.render('client/academy', { id })
    }

    public async updateAcademyPost({ request, response }: HttpContextContract) {
        let id = request.param('id')
        let payload = await request.validate(UpdateAcademyValidator)

        let user = await User.find(id);

        user?.merge(payload);
        await user?.save()

        return response.redirect().toRoute('client.updateImage', { id })
    }

    public async updateImage({ view, request }: HttpContextContract) {
        let id = request.param('id');

        return view.render('client/image', { id });
    }

    public async updateImagePost({ request, response }: HttpContextContract) {
        let id = request.param('id');
        let avatar = string.generateRandom(30) + ".png"
        let coverImage = string.generateRandom(30) + ".png"

        let payload = await request.validate(UpdateImageValidator);

        await payload.coverImage.move("./public/uploads/coverimages", { name: coverImage })
        await payload.avatar.move("./public/uploads/avatars", { name: avatar })

        let user = await User.find(id);
        user?.merge({ avatar, coverImage })

        await user?.save();

        return response.redirect().toRoute('client.updateTopic', { id });
    }

    public async updateTopic({ view, request }: HttpContextContract) {
        let id = request.param('id');
        let topics = await Topic.all();

        return view.render('client/topic', { id, topics });
    }

    public async updateTopicPost({ request, response }: HttpContextContract) {
        let id = request.param('id');
        let payload = await request.validate(UpdateTopicValidator);
        await UserTopic.query().where('userId', id).delete();

        let userTopics = payload.topic.map((item) => ({ topicId: Number(item), userId: id }))

        await UserTopic.createMany(userTopics)

        return response.redirect().toRoute('client.updateSocial', { id });
    }

    public async updateSocial({ request, view }: HttpContextContract) {
        let id = request.param('id')

        return view.render('client/social', { id })
    }

    public async updateSocialPost({ request, response, auth }: HttpContextContract) {
        let id = request.param('id')
        let payload = await request.validate(UpdateSocialValidator)

        let user = await User.find(id);

        user?.merge(payload);
        await user?.save()
        await auth.use("web").loginViaId(id);

        return response.redirect().toRoute('client.dashboard')
    }
}
