import Joi from "joi";
// validasi login
const loginSchemas = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Parameter email tidak sesuai format',
        'any.required': 'Email wajib diisi'
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'Password minimal 8 karakter',
        'any.required': 'Password wajib diisi'
    })
})

export default loginSchemas;