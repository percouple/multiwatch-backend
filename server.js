import express from "express";
import authenticateUser from "./authUser.js";
import getUserClocks from "./getUserClocks.js";
import createNewClock from './createNewClock.js';
import updateClock from "./updateClock.js";
import createNewUser from "./createNewUser.js";
import deleteClock from "./deleteClock.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())


app.post('/auth-user', async (req, res, next) => {
    try {
        const hashword = req.body.password;
        const user = await authenticateUser(req.body.username, hashword);

        // Generate a JWT (you should store a secret key securely)
        const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: '1h' });

        res.cookie('authToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000
        })

        return res.status(200).json({user: user, message: "YA DID IT"})
    }
    catch {
        res.status(400).json({ message: "User not found"})
    }
});

app.post('/get-user-clocks', async (req, res, next) => {
    try {
        const clocks = await getUserClocks(req.body.userId);
        res.status(200).json({clocks: clocks, message: "YA DID IT"})
    }
    catch {
        res.status(400).json({ message: "User's clocks not found"})
    }
})

app.post('/create-clock', async (req, res) => {
    try {
        const newClock = await createNewClock(req.body.userId);
        res.status(200).json({newClock: newClock, message: "YA DID IT"})
    }
    catch {
        res.status(400).json({ message: "Clock not created"})
    }
})

app.delete('/delete-clock', async (req, res) => {
    try {
        const res = await deleteClock(req.body.clockId);
        res.status(200).json({res: res, message: "YA DID IT"})
    }
    catch {
        res.status(400).json({ message: "Clock not deleted"})
    }
})

app.put('/update-clock', async (req, res) => {
    try {
        const result = await updateClock(req.body.clockId, req.body.changeObj);
        res.status(200).json({result: result, message: "YA DID IT"})
    }
    catch {
        res.status(400).json({ message: "Clock not updated"})
    }
})

app.post('/create-user', async (req, res) => {
    try {
        const user = await createNewUser(req.body.username, req.body.password);
        if (user === null) {
            return res.status(409).json({message: "Username is unavailable"})
        }
        res.status(200).json({user: user, message: "HEYO IT WORKED MY MAN"})
    } catch {
        res.status(400).json({ message: "Heyo it broke"})
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})