require("dotenv").config();
const path = require('path');
const express = require('express');
const app = express();
const db = require(path.join(__dirname,'models'));
const router = require(path.join(__dirname,'routes','routes.js'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(router);

// app.engine('ejs', ejs({ defaultLayout: 'main' }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

const PORT = process.env.PORT || 3000;

db.sequelize
    .sync({force:true})
    .then(() => {
        app.listen(PORT, () => {
            console.log("App is running on http://localhost:" + PORT)
        });
    });



