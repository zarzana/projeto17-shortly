import { signUpSchema } from "../schemas/userSchemas.js";

export function signUpValidator(req, res, next) {

    const validation = signUpSchema.validate(req.body);

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }

    next();

}