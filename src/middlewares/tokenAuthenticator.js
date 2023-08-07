import { db } from '../database.js';

export async function tokenAuthenticator(req, res, next) {

    // check for token
    const authorization = req.header('authorization');
    const token = authorization?.replace('Bearer ', '');
    if (!token) { return res.sendStatus(401) };

    // look for sessions with token
    const sessionUser = await db.query(`SELECT users.email, users.nameFROM sessions
        JOIN users ON sessions."userId" = users."userId"
        WHERE "token" = '${token}'`);
    if (sessionUser.rows.lenght = 0) { return res.sendStatus(401) };

    // save to locals
    res.locals.user = sessionUser.rows[0];

    next()

}