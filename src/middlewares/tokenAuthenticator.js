import { db } from "../database/database.js";

export async function tokenAuthenticator(req, res, next) {

    // check for token
    const authorization = req.header('authorization');
    const token = authorization?.replace('Bearer ', '');
    if (!token) { return res.sendStatus(401) };

    // look for sessions with token
    const sessionUser = await db.query(`SELECT users."userId", users.email, users.name FROM sessions
        JOIN users ON sessions."userId" = users."userId"
        WHERE "token" = '${token}'`);
    if (sessionUser.rows.lenght = 0) { return res.sendStatus(401) };

    // save to locals
    res.locals.user = sessionUser.rows[0];

    next()

}