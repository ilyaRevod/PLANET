const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

// Routes
const authLogin = require('./routes/API-auth-login');
const getClasses = require('./routes/API-get-classes');

const app = express();
const port = 3000;

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.get('/', function (req, res) {
  res.send("Hello! This is PLANET API's");
});

// Login
app.use('/api/auth/login', authLogin);

// Get classes
app.use('/api/get-classes', getClasses);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
