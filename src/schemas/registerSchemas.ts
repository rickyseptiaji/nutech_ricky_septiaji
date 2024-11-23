import Joi from "joi";
//validasi register
const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Parameter email tidak sesuai format",
    "any.required": "Email wajib diisi",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password minimal 8 karakter",
    "any.required": "Password wajib diisi",
  }),
  first_name: Joi.string().required().messages({
    "any.required": "Nama depan wajib diisi",
  }),
  last_name: Joi.string().required().messages({
    "any.required": "Nama belakang wajib diisi",
  }),
  profile_image: Joi.string().pattern(/\.(jpeg|png)$/i).messages({
    "string.pattern.base": "Gambar harus berupa file .jpeg, atau .png",
  }),  
});

export default registerSchema;
