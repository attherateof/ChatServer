import vine from '@vinejs/vine'

export const registrationValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().minLength(6),
    email: vine.string().trim().email(),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
  })
)
