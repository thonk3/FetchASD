const express = require('express');
const cors = require('cors');

// secrets
require('dotenv').config();

// express server config
const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(cors());
app.use(express.json());

// routing config
const sample = require('./route/sample.route');
app.use('/api', sample);

// start server
app.listen(port, () => {
    console.log(`server starting on port ${port}`);
});