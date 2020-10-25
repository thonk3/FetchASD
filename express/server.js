const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var morgan = require('morgan');
var winston = require('./winston');

// secrets
require('dotenv').config();

// express server config
const app = express();
//const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// mongo connection
// moved to start.js

//morgan-winston logging
app.use(morgan('common', { stream: winston.stream }));

// serving build static files
app.use(express.static(path.resolve(__dirname, "../react", "build")));


// api imports ==============================================================
const dogRouter = require('./routes/dogs');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const dateRouter = require('./routes/dogDate');
const dogRatingRouter = require('./routes/dogRating');
const locationRouter = require('./routes/locations');
const msgRouter = require('./routes/messages');
const eventRouter = require('./routes/event')

// lock api calls to only users with token
// token is grabbed from res.header("auth-token")
// do this after
const verifyToken = require('./validate-token');

app.use('/api/auth', authRouter);
app.use('/api/dogs', /* verifyToken, */ dogRouter);
app.use('/api/users', /* verifyToken, */ userRouter);
app.use('/api/date', /* verifyToken, */ dateRouter);
app.use('/api/rate', /* verifyToken, */ dogRatingRouter);
app.use('/api/locations', /* verifyToken, */ locationRouter);
app.use('/api/msg', msgRouter);
app.use('/api/event', eventRouter);
app.use('/api/test', require('./thing.js'));

// ==========================================================================

// redirecting everything else to the main build index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../react", "build", "index.html"));
})

// start express server
// app.listen(PORT, () => {
//     console.log(`server starting on port: ${PORT}`);
// });

module.exports = app;