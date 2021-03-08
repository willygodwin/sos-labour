const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','..','models'));
const isAuthenticated = require("../../config/middleware/isAuthenticated");
const { route } = require('../apiRoutes/apiRoutes');

// html route to display employer/company dashboard after they log-in

router.get('/employers/dashboard', (req,res) => {
    // if (!req.user) {
    //     // The user is not logged in, send back an empty object
    //     res.redirect("/")
    // } else {
    //   db.Company.findOne({where: {user_id: req.user.id}})
    //   .then((data) => db.Job.findAll({where: {company_id: data.id}}))
    //   .then((data2) => {
    //       console.log(data2);
    //       res.render('employersDashboard',{...data2})
    //     })
    //   .catch((err) => console.log(err));
    // }\
    console.log("THIS IS REQ USER"+req.user);
    db.Company.findOne({where: {UserId: req.user.id}})
        .then((data) => db.Job.findAll({where: {CompanyId: data.id}, include: db.Applied}))
        .then((data2) => {
            // console.log(data2);
            res.render('employersDashboard',{jobs: data2});
          })
        .catch((err) => console.log(err));
    // if(req.params.description == "dashboard"){
    //     db.Company.findOne({where: {UserId: req.user.id}})
    //     .then((data) => db.Job.findAll({where: {CompanyId: data.id}, include: db.Applied}))
    //     .then((data2) => {
    //         // console.log(data2);
    //         res.render('employersDashboard',{jobs: data2});
    //       })
    //     .catch((err) => console.log(err));
    // } else if (req.params.description == "viewopenjobs"){
    //     db.Company.findOne({where: {UserId: req.user.id}})
    //     .then((data) => db.Job.findAll({where: {CompanyId: data.id}, include: db.Applied}))
    //     .then((data2) => {
    //         // console.log(data2);
    //         res.render('employersViewOpenJobs',{jobs: data2});
    //       })
    //     .catch((err) => console.log(err));
    // } else {
    //     console.log('error');
    //     // res.redirect('/employers/dashboard');
    // }
});

// html route to display specific job posted by employer/company
router.get('/employers/viewjob/:jobid', (req,res) => {
    db.Job.findOne({where: {id:req.params.jobid}, include: {model: db.Applied,include:{model:db.User,include:db.Labourer}}})
    .then((data) => {
        // console.log(data);
        // console.log(data.dataValues.Applieds);
        // console.log(data.dataValues.Applieds[0].User.Labourer);
        res.render('employersViewJobById',{job: data.dataValues, applicants: data.dataValues.Applieds});
    })
    .catch((err) => console.log(err));
});

router.get('/labourers/dashboard', (req,res) => {
    db.Applied.findAll({where: {UserId: req.user.id}, include: db.Job})
    .then((data) => {
        console.log(data);
        res.json({success:true});
    })
    .catch((err) => console.log(err));
});

router.get('/labourers/jobsearch', isAuthenticated, (req,res) => {
    db.Job.findAll({where: {job_status: "open"}})
    .then((data) => {
        console.log(data);
        // res.json({success:true});
        res.render('jobSearch',{jobs: data});
        
    })
    .catch((err) => console.log(err));
})



module.exports = router