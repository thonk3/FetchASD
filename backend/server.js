const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI || "mongodb+srv://fetchThis:letMeIn@cluster0.3mhwe.mongodb.net/fetch?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const caninesRouter = require('./routes/canines');
const peopleRouter = require('./routes/people');
const relationshipRouter = require('./routes/relationships')

app.use('/canines', caninesRouter);
app.use('/people', peopleRouter);
app.use('/api/relationship', relationshipRouter);

//app.use(cors());
//app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
