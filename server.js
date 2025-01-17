import express from "express";
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log("Request happening")
    res.status(200)
    res.json({ message: "Heyo json working my man"})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})