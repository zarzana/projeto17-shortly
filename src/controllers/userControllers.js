import { db } from "../database/database.js";
import bcrypt from 'bcrypt';

export async function signUp(req, res) {

    const { name, email, password, confirmPassword } = req.body;

    try {

        // check if user with that email already exists
        const customerWithEmail = await db.query(`SELECT exists (SELECT 1 FROM users WHERE "email" = '${email}' LIMIT 1)`);
        if (customerWithEmail.rows[0].exists) { return res.sendStatus(409) };

        // password encryption
        const passwordHash = bcrypt.hashSync(password, 10);
        console.log(passwordHash);

        // create user in db
        await db.query(`INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3)`, [name, email, passwordHash]);
        res.sendStatus(201);

    } catch (err) {

        res.status(500).send(err.message);

    }

}