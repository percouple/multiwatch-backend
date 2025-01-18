import express from "express";
import findUser from './findUser.js';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        const user = findUser();
        console.log("Request happening")
        res.status(200)
        res.json({ message: "Heyo json working my man"})
    }
    catch {
        res.status(400)
        res.json({ message: "Heyo it broke"})
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})