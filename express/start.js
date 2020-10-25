const app = require('./server')
const mongoose = require('mongoose')


const PORT = process.env.PORT || 5000;


const URI = process.env.ATLAS_URI;
mongoose.connect(URI, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,  // true will break tests
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, () => {
    console.log(`server starting on port: ${PORT}`);
});
