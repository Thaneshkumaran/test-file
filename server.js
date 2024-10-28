// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Route for handling form submission
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Error saving data');
      return;
    }
    res.send('Registration successful');
  });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
