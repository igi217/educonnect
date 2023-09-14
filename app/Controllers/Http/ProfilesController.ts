import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class ProfilesController {
    public async index({ request, view, auth }: HttpContextContract) {
        let id = request.param('id').split('.').at(-1);
        let user = await User.query().where('id', id).withCount('followers').withCount('followings').withCount('followers', (query) => {
            query.where('follower_id', auth.user?.id!).as('following')
        }).first();

        return view.render('client/profile/index', { user })
    }
}
