const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const fs = require('fs');
// const morgan = require('morgan');
// const path = require('path');

// Routes
const authLogin = require('./routes/API-auth-login');
const getClasses = require('./routes/API-get-classes');

const app = express();
const port = process.env.PORT || 3000;

/*
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://planet-frontend-t4t1.onrender.com',
  credentials: true
}));


app.get('/', function (req, res) {
  res.send("Hello! This is PLANET");
});

// Login
app.use('/api/auth/login', authLogin);

// Get classes
app.use('/api/get-classes', getClasses);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
