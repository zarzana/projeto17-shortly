import { shortenUrlSchema } from "../schemas/urlSchemas.js";

export function shortenUrlValidator(req, res, next) {

    const validation = shortenUrlSchema.validate(req.body);

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }

    next();

}