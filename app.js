const express = require('express');
const sqlite3 = require('sqlite3');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('./database.db');

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});