const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'pug')

app.get("/" , (req, res) => {
    res.render('index')
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});