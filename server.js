const express = require('express');

const app = new express();

app.get("/", (req, res) => {
    res.send("Hello Friend!");
})

app.listen(3000, () => console.log("App ready"));