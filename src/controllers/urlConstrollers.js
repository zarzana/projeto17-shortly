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

export async function getUrlById(req, res) {

    const urlId = req.params.id;

    try {

        const urlWithId = await db.query(`SELECT * FROM urls WHERE "urlId"=${urlId} LIMIT 1`);
        if (urlWithId.rows.length === 0) { return res.sendStatus(404) };

        res.status(200).send({
            'id': urlWithId.rows[0].urlId,
            'shortUrl': urlWithId.rows[0].shortUrl,
            'url': urlWithId.rows[0].url });

    } catch (err) {

        res.status(500).send(err.message);

    }

}

export async function openUrl(req, res) {

    const shortUrl = req.params.shortUrl;

    try {

        const updateCount = await db.query(`UPDATE urls
            SET "visitCount" = "visitCount" + 1
            WHERE "shortUrl"='${shortUrl}'
            RETURNING "url"`);
        if (updateCount.rowCount === 0) { return res.sendStatus(404) };

        res.redirect(Object.values(updateCount.rows[0])[0]);

    } catch (err) {

        res.status(500).send(err.message);

    }

}