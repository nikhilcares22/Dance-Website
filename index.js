const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });

const port = 8080;

//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    desc: String,
    address: String

});

var Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPEIFIC STUFF
app.use('/static', express.static('static')); //for serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views')); //set the views dir

app.get('/', (req, res) => {
    const params = {};
    res.render('home.pug');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res) => {

    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("this item has been saved to the database")
    }).catch(() => {
        res.status(400).send("not saved ")
    })
});


app.listen(port, (req, res) => {
    console.log(`Server running at ${port}`);
});