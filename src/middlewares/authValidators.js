import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";

export function signUpValidator(req, res, next) {

    const validation = signUpSchema.validate(req.body);

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }

    next();

}

export function signInValidator(req, res, next) {

    const validation = signInSchema.validate(req.body);

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }

    next();

}