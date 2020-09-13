const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// secrets
require('dotenv').config();

// express server config
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// mongo connection
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


// serving build static files
app.use(express.static(path.resolve(__dirname, "../react", "build")));

// api imports --------------------------------------------------
const caninesRouter = require('./routes/canines');
const peopleRouter = require('./routes/people');
const userRouter = require('./routes/users');

app.use('/api/canines', caninesRouter);
app.use('/api/people', peopleRouter);
app.use('/api/users', userRouter);
// --------------------------------------------------------------

// redirecting everything else to the main build index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../react", "build", "index.html"));
})

// start express server
app.listen(PORT, () => {
    console.log(`server starting on port: ${PORT}`);
});