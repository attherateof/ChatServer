import type { HttpContext } from '@adonisjs/core/http'
import { registrationValidator } from '#validators/user/auth/register'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'

export default class RegisterController {
  async execute({ request, response }: HttpContext) {
    const payload = await registrationValidator.validate(request.all())
    const existingUser = await User.findBy('email', payload.email)
    if (!existingUser) {
      const user = new User()
      user.fullName = payload.full_name
      user.email = payload.email
      user.password = await hash.make(payload.password)
      await user.save()

      const token = await User.accessTokens.create(user)

      return response.json({
        type: 'bearer',
        value: token.value!.release(),
        user: user,
        message: 'User registered successfully',
      })
    }
    return response.json({
      success: false,
      message: 'User already exist with the same email.',
    })
  }
}
