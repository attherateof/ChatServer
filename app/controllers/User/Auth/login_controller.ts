import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { loginValidator } from '#validators/user/auth/login'

export default class LoginController {
  async execute({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])
    const { email, password } = await loginValidator.validate(data)

    try {
      const user = await User.findBy('email', email)

      if (!user) {
        return response.abort('Invalid credentials')
      }
      await hash.verify(user.password, password)
      const token = await User.accessTokens.create(user)
      return response.json({
        type: 'bearer',
        value: token.value!.release(),
        user: user,
        message: 'User login successfully',
      })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
