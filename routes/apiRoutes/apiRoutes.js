const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','..','models'));
const { Op } = require('sequelize');
var passport = require("../../config/passport");


router.post('/api/postnewjob', (req,res) => {
    db.Company.findOne({where: {UserId: req.user.id}})
    .then((data) => {
        console.log(data);
        const CompanyId = data.dataValues.id;
        const {address,site_manager,start_date,end_date,number_of_labourers} = req.body;
        return db.Job.create({
            address,
            site_manager,
            start_date,
            end_date,
            number_of_labourers,
            CompanyId,
        })
    })
    .then((data2) => {
        // console.log(data);
        console.log(`Successfully created a new job`);
        res.json({success:true});
    })
    .catch((err) => console.log(err));
})
// api routes to update posted job by employer/company
router.put('/api/updatejob/:jobid', (req,res) => {
    // console.log(req.body);
    if (req.params.jobid === req.body.id){
        const {id,address,site_manager,start_date,end_date,number_of_labourers} = req.body;
        db.Job.update({
            address,
            site_manager,
            start_date,
            end_date,
            number_of_labourers,
        },{
            where:{id}
        })
        .then(() => {
            console.log(`successfully updated Job ID: ${id}`);
            res.json({success:true});
        })
        .catch((err) => console.log(err));
    }else{
        res.redirect(`/employers/viewjob/${req.params.jobid}`)
    }
});

// api route to delete posted job by employer/company
router.delete(`/api/deletejob/:jobid`, (req,res) => {
    
    if(req.params.jobid === req.body.id){
        console.log(`Successfully Deleted from database Job ID: ${req.params.jobid}`);
        db.Job.destroy({where:{id: req.params.jobid}})
        .then(() => res.json({success:true}))
        .catch((err) => console.error(err));
    }else{
        console.log(`delete was UNSUCESSFUL`);
    }
});

// api route to update when labourer has been chosen for a particular job posted by employer/company
router.put('/api/applicantschosenfor/:jobid', (req,res) => {
    if(req.params.jobid == req.body[0].JobId){
        const chosenApplicants = req.body;
        db.Job.update({job_status: 'closed'},{where:{id: chosenApplicants[0].JobId}})
        .then(() => {
            return chosenApplicants.reduce((res, user) => {
                return res.then(() =>  db.Applied.update({
                    chosen: true
                },{
                    where:{
                        UserId:user.UserId, 
                        JobId: user.JobId
                    }
                }));
            }, Promise.resolve())
        })
        .then(() => { 
            let chosenUserId = chosenApplicants.map(user => user.UserId);
            return db.Applied.update({chosen:false},{where: {JobId: chosenApplicants[0].JobId, UserId: {[Op.not]: chosenUserId}}});
        })
        .then(() => res.json({success:true}))
        .catch((err) => console.log(err))
    }else{
        res.redirect(`/employers/viewjob/${req.params.jobid}`)
    }
    
})

// api route to resign from applied job by labourer
router.delete('/api/resignapplication/:jobAddress',(req,res) => {
    db.Job.findOne({where: {address: req.params.jobAddress}})
    .then((data) => db.Applied.destroy({where:{JobId: data.dataValues.id, UserId: req.user.id}}))
    .then(() => res.json({success:true}))
    .catch((err) => console.log(err))
})





module.exports = router