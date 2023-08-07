import { db } from "../database/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

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

export async function signIn(req, res) {

    const { email, password } = req.body;

    try {

        // check if email and password match
        const users = await db.query(`SELECT * FROM users WHERE "email" = '${email}'`);
        if (!users.rows.length > 0 || !bcrypt.compareSync(password, users.rows[0].password)) {
            return res.sendStatus(401);
        };

        // generate token
        const token = uuid();

        // create session in db
        await db.query(`INSERT INTO sessions ("userId", "token") VALUES ($1, $2)`, [users.rows[0].userId, token]);
        res.status(200).send({'token': token});

    } catch (err) {

        res.status(500).send(err.message);

    }

}