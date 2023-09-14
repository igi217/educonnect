import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Follower from 'App/Models/Follower';
import Notification from 'App/Models/Notification';

export default class FollowersController {
    public async follow({ request, response, auth }: HttpContextContract) {
        let followingId = request.param('id');
        let followerId = auth.user?.id;


        let followerExists = await Follower
            .query()
            .where('followerId', followerId!)
            .where('followingId', followingId)
            .first()

        if (followerExists) {
            await followerExists.delete();
        }
        else {
            await Follower.create({
                followingId,
                followerId
            })

            await Notification.create({
                userId: followingId,
                text: `${auth.user?.fullName} started following you!`,
                link: `/profile/${auth.user?.userName}`
            })
        }

        return response.redirect().back()


    }
}
