/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', 'AuthController.login').as('client.login')
Route.post('/loginPost', 'AuthController.loginPost').as('client.loginPost')
Route.get('/register', 'AuthController.register').as('client.register')
Route.post('/registerPost', 'AuthController.registerPost').as('client.registerPost')
Route.get('/updateAcademy/:id', 'AuthController.updateAcademy').as('client.updateAcademy')
Route.post('/updateAcademyPost/:id', 'AuthController.updateAcademyPost').as('client.updateAcademyPost')
Route.get('/updateImage/:id', 'AuthController.updateImage').as("client.updateImage")
Route.post('/updateImagePost/:id', 'AuthController.updateImagePost').as('client.updateImagePost')
Route.get('/updateTopic/:id', 'AuthController.updateTopic').as('client.updateTopic')
Route.post('/updateTopicPost/:id', 'AuthController.updateTopicPost').as('client.updateTopicPost')
Route.get('/updateSocial/:id', 'AuthController.updateSocial').as('client.updateSocial')
Route.post('/updateSocialPost/:id', 'AuthController.updateSocialPost').as('client.updateSocialPost')
Route.group(() => {
  Route.get('/dashboard', 'HomeController.index').as('client.dashboard')
  Route.get('/profile/:id', 'ProfilesController.index').as('client.profile')
  Route.get('/dashboard/:slug/:id', 'HomeController.projectByTopic').as('client.filterByTopic')
  Route.get('/follow/:id', 'FollowersController.follow').as('client.follow')
  Route.get('/notification/seenAll', 'HomeController.seenAll').as('client.seenAll')
  Route.get('/project/add', 'HomeController.addProject').as('client.project.add')
  Route.post('/project/create', 'HomeController.createProject').as('client.project.create')
  Route.get('/project/:slug/:id', 'HomeController.project').as('client.project.details')
  Route.get('/upvote/project/:id', 'HomeController.upvote').as('client.project.upvote')
  Route.post('/search', 'HomeController.search').as('client.project.search')
  Route.get('/search', ({ response }) => {
    return response.redirect().toRoute('client.dashboard')
  })
  Route.get('/logout', 'HomeController.logout').as('client.logout')
}).middleware("auth:web")
