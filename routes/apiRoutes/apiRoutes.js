const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','..','models'));
const { Op } = require('sequelize');
var passport = require("../../config/passport");

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
        console.log(req.body);
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
        console.log(chosenApplicants);
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
            console.log(chosenUserId);
            return db.Applied.update({chosen:false},{where: {JobId: chosenApplicants[0].JobId, UserId: {[Op.not]: chosenUserId}}});
        })
        .then(() => res.json({success:true}))
        .catch((err) => console.log(err))
    }else{
        res.redirect(`/employers/viewjob/${req.params.jobid}`)
    }
    
})





module.exports = router