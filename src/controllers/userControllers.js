import { db } from "../database/database.js";

export async function getMe(req, res) {

    const user = res.locals.user;

    try {

        // no join required as user info is already stored in locals
        const urls = await db.query(`SELECT "urlId" as id, "shortUrl", "url", "visitCount"
            FROM urls WHERE urls."userId"='${user.userId}'`);

        res.status(200).send({
            "id": user.userId,
            "name": user.name,
            "visitCount": urls.rows.map(e => e.visitCount).reduce((a, c) => a + c, 0),
            "shortenedUrls": urls.rows
        });

    } catch (err) {

        res.status(500).send(err.message);

    }

}

export async function getRanking(req, res) {

    try {

        const ranking = await db.query(`
            SELECT
                users."userId" as id,
                users."name",
                COUNT(urls."urlId") as "linksCount",
                COALESCE(SUM(urls."visitCount"), 0) as "visitCount"
            FROM
                users
            LEFT JOIN
                urls
            ON
                users."userId" = urls."userId"
            GROUP BY
                users."userId"
            ORDER BY
                "visitCount" DESC
            LIMIT
                10`);

        res.status(200).send(ranking.rows);

    } catch (err) {

        res.status(500).send(err.message);

    }

}