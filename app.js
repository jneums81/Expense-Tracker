const express = require('express');
const sqlite3 = require('sqlite3');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('./database.db');

// Inside app.js

// Create expenses table
db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        amount REAL,
        date TEXT
    )
`);

// Function to get all expenses
const getExpenses = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM expenses', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

// Function to add an expense
const addExpense = (description, amount, date) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO expenses (description, amount, date) VALUES (?, ?, ?)', [description, amount, date], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

// Your other database operations go here
// ...

// Your other database operations go here

// Display all expenses
app.get('/', async (req, res) => {
    try {
        const expenses = await getExpenses();
        res.render('index', { expenses });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Display form to add a new expense
app.get('/add', (req, res) => {
    res.render('add');
});

// Handle form submission to add a new expense
app.post('/add', async (req, res) => {
    const { description, amount, date } = req.body;
    
    try {
        await addExpense(description, amount, date);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Your other routes go here

// ...


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});