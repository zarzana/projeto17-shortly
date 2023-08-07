import joi from "joi";

export const signUpSchema = joi.object({
    'name': joi.string().required(),
    'email': joi.string().email({ tlds: { allow: false } }),
    'password': joi.string().required(),
    'confirmPassword': joi.string().valid(joi.ref('password'))
});