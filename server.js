import express from "express";
import authenticateUser from "./DB_Functions/authUser.js";
import getUserClocks from "./DB_Functions/getUserClocks.js";
import createNewClock from './DB_Functions/createNewClock.js';
import updateClock from "./DB_Functions/updateClock.js";
import createNewUser from "./DB_Functions/createNewUser.js";
import deleteClock from "./DB_Functions/deleteClock.js";
import editUser from "./DB_Functions/editUser.js";
import findUser from './DB_Functions/findUser.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use(cors());

app.post('/auth-user', async (req, res) => {
    try {
        const user = await authenticateUser(req.body.username);
        const validation = await bcrypt.compareSync(req.body.password, user.password);
        if (!validation) {
            return res.status(404).json({ message: "Username or password incorrect"})
        }

        // Generate a JWT (you should store a secret key securely)
        // const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: '1h' });

        // res.cookie('authToken', token, {
        //     httpOnly: true,
        //     sameSite: 'strict',
        //     maxAge: 3600000
        // })

        return res.status(200).json({user: user, message: "User successfully authenticated"})
    }
    catch {
        res.status(400).json({ message: "User not found"})
    }
});

app.post('/get-user-clocks', async (req, res, next) => {
    try {
        const clocks = await getUserClocks(req.body.userId);
        res.status(200).json({clocks: clocks, message: "User clocks successfully loaded"})
    }
    catch {
        res.status(400).json({ message: "User's clocks not found"})
    }
})

app.post('/create-clock', async (req, res) => {
    try {
        const newClock = await createNewClock(req.body.userId);
        res.status(200).json({newClock: newClock, message: "New clock successfully created."})
    }
    catch {
        res.status(400).json({ message: "Clock not created"})
    }
})

app.delete('/delete-clock', async (req, res) => {
    try {
        const res = await deleteClock(req.body.clockId);
        res.status(200).json({res: res, message: "Clock successfully deleted."})
    }
    catch {
        res.status(400).json({ message: "Clock not deleted"})
    }
})

app.put('/update-clock', async (req, res) => {
    try {
        const result = await updateClock(req.body.clockId, req.body.changeObj);
        res.status(200).json({result: result, message: "Clock successfully updated."})
    }
    catch {
        res.status(400).json({ message: "Clock not updated"})
    }
})

app.post('/create-user', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashword = await bcrypt.hash(req.body.password, salt);
        const user = await createNewUser(req.body.username, hashword);
        if (user === null) {
            return res.status(409).json({message: "Username is unavailable"})
        }
        await createNewClock(user.id);
        res.status(200).json({user: user, message: "User successfully created."})
    } catch {
        res.status(400).json({ message: "User not successfully created."})
    }
})

app.put('/edit-user', async (req, res) => {
    try {
        const user = await editUser(req.body.userId, req.body.changeObj);
        if (user === null) {
            return res.status(409).json({message: "Username is unavailable"})
        }
        res.status(200).json({user: user, message: "User succesfully edited."})
    } catch {
        res.status(400).json({ message: "Error editing user."})
    }
})

app.get('/ping-server', async (req, res) => {
    try {
        res.status(200).json({message: "Server responded."})
    } catch {
        res.status(400).json({ message: "No response from listed server."})
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})