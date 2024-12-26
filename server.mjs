import express from "express";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log("Request happening")
    res.send("get request working")
})

app.listen(port, () => {
    console.log(`Server runing on port ${port}`)
})