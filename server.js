import express from "express";
import findUser from './findUser.js';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/get-user', async (req, res, next) => {
    try {
        const user = await findUser(req.body.username);
        res.status(200).json(user)
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