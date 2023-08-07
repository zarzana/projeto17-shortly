import { db } from "../database/database.js";
import { customAlphabet } from 'nanoid';

export async function shortenUrl(req, res) {

    const { url } = req.body;

    // generate nanoid
    const nanoid = customAlphabet('0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz', 8);
    const shortUrl = nanoid();

    try {

        // create url in db
        const urlId = await db.query(`INSERT INTO urls ("userId", "url", "shortUrl") VALUES ($1, $2, $3) RETURNING "urlId"`,
            [res.locals.user.userId, url, shortUrl]);
        res.status(201).send({ 'id': Object.values(urlId.rows[0])[0], 'shortUrl': shortUrl });

    } catch (err) {

        res.status(500).send(err.message);

    }

}