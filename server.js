import express from "express";
import config from 'dotenv';
import { Prisma } from "@prisma/client";

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log("Request happening")
    res.status(404)
    res.json({ message: "Heyo json working my man"})
})

app.listen(port, () => {
    console.log(`Server runing on port ${port}`)
})