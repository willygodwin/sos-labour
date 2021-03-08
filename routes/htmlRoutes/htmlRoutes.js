const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','..','models'));
const isAuthenticated = require(path.join(__dirname,'..','..','config','middleware','isAuthenticated'));
const { Op } = require("sequelize");

// html route to display employer/company dashboard after they log-in
router.get('/employers/dashboard', isAuthenticated, (req,res) => {
    if (req.user.user_type == 'company'){
        db.Company.findOne({
            where: {UserId: req.user.id}, 
            include:{
                model: db.Job, 
                include: db.Applied
            }
        })
        .then((data) => res.render('employersDashboard',{
            companyName: data.dataValues.company_name,
            jobs: data.dataValues.Jobs,
        }))
        .catch((err) => console.log(err));
    }else{
        res.redirect('/labourers/dashboard');
    }
    
});

// html route to display specific job posted by employer/company
router.get('/employers/viewjob/:jobid', isAuthenticated, (req,res) => {
    if(req.user.user_type == 'company'){
        db.Job.findOne({where: {id:req.params.jobid}})
        .then((data) => {
            const companyId = data.dataValues.CompanyId;
            return companyId
        })
        .then((id) => {
            if(id == req.user.id){
                return db.Job.findOne({
                    where: {id:req.params.jobid}, 
                    include: {
                        model: db.Applied,
                        include:{
                            model:db.User,include:db.Labourer
                        }
                    }
                })
                .then((data) => res.render('employersViewJobById',{
                    job: data.dataValues, 
                    applicants: data.dataValues.Applieds
                }))
            } else {
                throw Error ('Unauthorized Access!');
            }
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
        
    }else{
        res.redirect('/labourers/dashboard');
    }
});

router.get('/employers/postnewjob', isAuthenticated, (req,res) => {
    if(req.user.user_type == 'company'){
        res.render('employersPostNewJob');
    }
    else{
        console.log('redirect');
        res.redirect('/');
    }
});

router.get('/employers/viewpostedjobs', isAuthenticated, (req,res) => {
    if(req.user.user_type == 'company'){
        res.render('employersViewPostedJobs');
    }else{
        res.redirect('/');
    }
})

router.get('/labourers/dashboard', isAuthenticated, (req,res) => {
    if (req.user.user_type == 'labourer'){
        db.Labourer.findOne({
            where: {UserId: req.user.id}
        })
        .then(({dataValues}) => {
            return db.Applied.findAll({
                where: {chosen:true, UserId: req.user.id}, 
                include: db.Job, 
                order:[[db.Job,'start_date','ASC']]
            })
            .then((data2) => {
                let result = {...dataValues}
                result.Applied = data2;
                return result;
            })
        })
        .then((data3) => {
            res.render('labourerDashboard',{
                applied:data3.Applied,
                labourerName: data3.first_name + data3.last_name
            })
        })
        .catch((err) => console.log(err));
    } else {
        res.redirect('/employers/dashboard')
    }
    
});

router.get('/labourers/viewappliedjob', isAuthenticated, (req,res) => {
    if (req.user.user_type == 'labourer'){
        db.Applied.findAll({
            where: {UserId: req.user.id}, 
            include: db.Job, 
            order:[['id','DESC']]
        })
        .then((data) => {
            res.render('labourerViewAppliedJob',{applied:data})
        })
        .catch((err) => console.log(err));
    } else {
        res.redirect ('/employers/dashboard');
    }
    
})

router.get('/labourers/jobsearch', isAuthenticated, (req,res) => {
    db.Applied.findAll({
        where:{UserId: req.user.id}
    })
    .then((data) => {
        // console.log(data);
        const jobApplied = data.map(applied => {
            return applied.JobId
        });
        return db.Job.findAll({
            where:{
                id: {[Op.notIn]: jobApplied },
                job_status: 'open'
            }
        })
    })
    .then((data2) => res.render('jobSearch',{jobs: data2}))
    .catch((err) => console.log(err));

})



module.exports = router