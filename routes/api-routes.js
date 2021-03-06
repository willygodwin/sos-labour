// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const sendMail = require("../config/send-mail"); 
const fs = require('fs')
const path = require('path')

const mailCompany = async (req, labourer, data) => {
  const companyEmail = data.dataValues.email
      console.log("sucesss")
      console.log(companyEmail)
      //     //Sending a mail to the labourer informing them they have applied for a job. 
          const mailObj = {
            from: "info@jiffy.com.au",
            // to: req.session.user.email,
            to: companyEmail,
            subject: "New Job Application", // subject line 
            text: `<p> ${labourer.dataValues.first_name} ${labourer.dataValues.last_name} 
                  just applied for one of your jobs, click the link below to view</p>
                  
                  <a href="/employers/viewjob/${req.body.JobId}">View Job</a>
                  `
          }
          sendMail(mailObj).catch((err) => console.log(err));
          
        }


module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // console.log("This is req.user\n\n"+req.user+"\n\n");
    req.session.user = req.user;
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    // console.log(req.body.email, req.body.password, req.body.user_type)
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      user_type: req.body.user_type

    })
      .then(function() {
        console.log("sucesss")
        // console.log(req.body.user_type)
        res.redirect(307, "/api/login");
        
      })
      .catch(function(err) {
        console.log("fail")
        console.log(err)
        res.status(401).json(err);
      });
  });

  app.post("/api/labourerdetails", function(req, res) {
    // console.log(req.body.first_name, req.body.last_name, req.body.dob, req.body.driver_license, 
      // req.body.whitecard, req.body.skills_experience)
      // console.log(req.body.img_reference, req.body.base64IMG)

      const imgContents = req.body.base64IMG?.split(',')[1];

      if(imgContents !== undefined){

        if (typeof Buffer.from === "function") {
          // Node 5.10+
          buf = Buffer.from(imgContents, 'base64'); // Ta-da
        } else {
          // older Node versions, now deprecated
          buf = new Buffer(imgContents, 'base64'); // Ta-da
        }
        fs.writeFile(path.join(__dirname, "..", "public", "asset", "images", req.body.img_reference), buf, err => {
          console.log(err)
          //
          })
      }

    db.Labourer.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name, 
      dob: req.body.dob,
      driver_license: req.body.driver_license ,
      whitecard: req.body.whitecard, 
      skills_experience: req.body.skills_experience,
      UserId: req.body.UserId,
      img_reference: req.body.img_reference
    })
      .then(function() {
        res.redirect("/usercheck");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/companydetails", function(req, res) {
    // console.log(req.body.company_name, req.body.abn, req.body.UserId )
    db.Company.create({
      company_name: req.body.company_name,
      abn: req.body.abn, 
      UserId: req.body.UserId
    })
      .then(function() {
        res.redirect("/usercheck");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/usercheck");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    // console.log(req.user)
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/job/apply",  (req,res) => {
    console.log("***********************", req.session.user.id)
    db.Applied.create({
        JobId: req.body.JobId,
        UserId: req.session.user.id
    })
    .then(() => {
        return db.Job.findOne({where: {id: req.body.JobId}})
    })
    .then((data) =>{
        return db.Company.findOne({where: {id: data.dataValues.CompanyId}})
    })
    .then((data) =>{
        return db.User.findOne({where: {id: data.dataValues.UserId}}) 
    })
    .then(async (data) => {
      const labourer = await db.Labourer.findOne({where: {UserId: req.session.user.id}})
      console.log(labourer)

      mailCompany(req, labourer, data)

      res.json({success:true})
    
      
      })
      .catch(function(err) {
          console.log("fail")
          console.log(err)
      });
    })  
};
