import express from "express";
import findUser from './findUser.js';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/get-user', async (req, res, next) => {
    try {
        console.log("routing")
        console.log(req.body)
        let user;
        if (!req.body.id) {
            user = createNewUser();
        }
        user = await findUser(req.body.id);
        res.status(200).json({user: user, message: "YA DID IT"})
    }
    catch {
        res.status(400).json({ message: "Heyo it broke"})
    }
})

app.post('/create-clock', async (req, res) => {
    try {
        res.status(200).json()
    } catch {
        res.status(400).json({ message: "Heyo it broke"})
    }
})

app.post('/create-user', async (req, res) => {
    try {
        res.status(200).json()
    } catch {
        res.status(400).json({ message: "Heyo it broke"})
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})