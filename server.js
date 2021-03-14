// Requiring necessary npm packages
require("dotenv").config();
const path = require('path');
const express = require('express');
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require(path.join(__dirname,'config','passport'));
const app = express();
const db = require(path.join(__dirname,'models'));
const router = require(path.join(__dirname,'routes','routes.js'));
// Creating express app and configuring middleware needed for authentication
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname,'public')));

// We need to use sessions to keep track of our user's login status
// app.use(express.cookieParser());
// app.use(express.bodyParser());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;

// app.engine('ejs', ejs({ defaultLayout: 'main' }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

// Requiring our routes
app.use(router);
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App is running on http://localhost:" + PORT);
  });
});


