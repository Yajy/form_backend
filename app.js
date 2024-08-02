const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 9090;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yajy',
    password: 'swami123',
    database: 'mydatabase' 
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.post('/submit', (req, res) => {
    const { name, phone, email, message } = req.body;

    const query = 'INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, phone, email, message], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving data.');
            return;
        }
        res.send('Form data saved successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


