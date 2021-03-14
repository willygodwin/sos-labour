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
                include: {
                    model: db.Applied,
                    where:{chosen:true},
                    include:{
                        model:db.User,
                        include:db.Labourer
                    }
                },
                limit: 3
            }
        })
        .then((data) => {
            // console.log(data.dataValues.Jobs[0].Applieds[0]);
            // res.json(data);
            res.render('employersDashboard',{
                name: data.dataValues.company_name,
                jobs: data.dataValues.Jobs,
            });
        })
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
                return db.Company.findOne({
                    where: {UserId: req.user.id}, 
                    include: {
                        model: db.Job,
                        where: {id:req.params.jobid},
                        include:{
                            model: db.Applied,
                            include:{
                                model:db.User,
                                include:db.Labourer
                            }
                        }
                    }
                })   
            } else {
                throw Error ('Unauthorized Access!');
            }
        })
        .then((data) => res.render('employersViewJobById',{
                name: data.dataValues.company_name,
                job: data.dataValues.Jobs[0],
                applicants: data.dataValues.Jobs[0].Applieds
        }))
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
        db.Company.findOne({where: {UserId: req.user.id}})
        .then((data) => res.render('employersPostNewJob',{name: data.dataValues.company_name}))
        .catch((err) => console.log(err));
    }
    else{
        console.log('redirect');
        res.redirect('/');
    }
});

router.get('/employers/viewpostedjobs', isAuthenticated, (req,res) => {
    if(req.user.user_type == 'company'){
        db.Company.findOne({
            where: {UserId: req.user.id}, 
            include: {
                model: db.Job,
                include:{
                    model: db.Applied,
                    include:{
                        model:db.User,
                        include:db.Labourer
                    }
                }
            },
            order:[[db.Job,'id','DESC']]
        })   
        .then((data) => res.render('employersViewPostedJobs',{
            name: data.dataValues.company_name,
            jobs: data.dataValues.Jobs,
        }))
        .catch((err) => console.log(err));
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
                name: data3.first_name + " " + data3.last_name,
                image: data3.img_reference
            })
        })
        .catch((err) => console.log(err));
    } else {
        res.redirect('/')
    }
    
});

router.get('/labourers/viewappliedjob', isAuthenticated, (req,res) => {
    if (req.user.user_type == 'labourer'){
        db.Labourer.findOne({
            where: {UserId: req.user.id}
        })
        .then(({dataValues}) => {
            return db.Applied.findAll({
                where: {UserId: req.user.id}, 
                include: db.Job, 
                order:[['id','DESC']]
            })
            .then((data2) => {
                let result = {...dataValues}
                result.Applied = data2;
                return result;
            })
        })
        .then((data3) => {
            // res.json(data3);
            res.render('labourerViewAppliedJob',{
                applied:data3.Applied,
                name: data3.first_name + " " + data3.last_name,
                image: data3.img_reference
            })
        })
        .catch((err) => console.log(err));
    } else {
        res.redirect ('/');
    }
    
})

router.get('/labourers/jobsearch', isAuthenticated, (req,res) => {
    if (req.user.user_type == 'labourer'){
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
        .then(async (data2) => {
            const labourer = await db.Labourer.findOne({
                where: {UserId: req.user.id}
            });
            data2.name = labourer.first_name + " " + labourer.last_name;
            res.render('jobSearch',{jobs: data2, name: data2.name, image: labourer.img_reference });
            
        })
        .catch((err) => console.log(err));
    } else {
        res.redirect ('/');
    }
})



module.exports = router