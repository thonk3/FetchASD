const express = require('express');
const path = require('path');
const cors = require('cors');

// secrets
require('dotenv').config();

// express server config
const app = express();
const PORT = process.env.PORT || 5000;  // just a random port
                                        // if this is changed, also change the proxy port in ../react/package.json

// middleware
app.use(cors());
app.use(express.json());    // may change this to bodyParser instead

// serving build static files
app.use(express.static(path.resolve(__dirname, "../react", "build")));

// api imports --------------------------------------------------
const sample = require('./route/sample.route');

// api routes
app.use('/api/sample', sample);
// --------------------------------------------------------------

// redirecting everything else to the main build index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../react", "build", "index.html"));
})

// start express server
app.listen(PORT, () => {
    console.log(`server starting on port: ${PORT}`);
});