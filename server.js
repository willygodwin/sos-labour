const express = require('express');
require("dotenv").config();
const db = require('./models');
// same as
// const db = require('./models/index');
const app = express();


const PORT = 3000;

db.sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log("App is running on http://localhost:" + PORT)
        });
    });



