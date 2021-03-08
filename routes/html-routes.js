// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const unAuthenticated = require("../config/middleware/unauthenticated");
const db = require("../models");

module.exports = function(app) {

  app.get("/", isAuthenticated, function(req, res) {
    db.User.findOne({where: {id: req.user.id}})
    .then((data) => {
      // console.log(data);
      if (data.dataValues.user_type == 'company'){
        res.redirect('/employers/dashboard');
      }else{
        res.redirect('/labourers/dashboard')
      }
    })
  });

  app.get('/signup',(req,res) => {
    res.sendFile(path.join(__dirname,'..','public','signup.html'));
  })
  app.get("/login", unAuthenticated, function(req, res) {
    // If the user already has an account send them to the members page
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, function(req, res) {
  //   db.User.findOne({where: {id: req.user.id}})
  //   .then((data) => {
  //     if (data.dataValues.user_type == 'company'){
  //       res.redirect('/employers/dashboard');
  //     }else if (data.dataValues.user_type == 'labourer'){
  //       res.redirect('/labourers/dashboard')
  //     }else{
  //       res.redirect('/login');
  //     }
  //   })
  //   // res.sendFile(path.join(__dirname, "../public/members.html"));
  // });

  app.get("/companydetails", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/companydetails.html"));
  });

  app.get("/labourerdetails", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/labourerdetails.html"));
  });


};
