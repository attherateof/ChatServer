/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const UsersAuthLoginController = () => import('#controllers/User/Auth/login_controller')
const UsersAuthRegistrationController = () => import('#controllers/User/Auth/register_controller')

router
  .get('/', async () => {
    return {
      hello: 'world',
    }
  })
  .use(middleware.auth())

router.post('user/auth/login', [UsersAuthLoginController, 'execute'])
router.post('user/auth/register', [UsersAuthRegistrationController, 'execute'])
