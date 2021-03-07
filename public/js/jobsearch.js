
// JS to run when rendering HTML /employers/dashboard
if (window.location.pathname === '/labourers/jobsearch'){
    const applyButtons = document.querySelectorAll('.btn-apply');
    // console.log(jobCards);
    applyButtons.forEach((apply) => {
        apply.addEventListener('click',(e) => {
            e.preventDefault();
            console.log(e.currentTarget);
            const jobId = e.currentTarget.getAttribute('data-jobID');
            console.log(jobId);

            applyJob(jobId)
            .then((response) => {
                // Check that the response is all good
                // Reload the page so the user can see the new quote
                if (response.ok) {
                    
                    console.log("successs")// if all good have to send the user to their dashboard
    
                    // If there's an error, log the error
                } else {
                    alert('something went wrong!');
                }
            }).catch((err) => console.log(err));
    
            // location.href = `http://localhost:3000/employers/viewjob/${jobId}`
        })
    });
}

const applyJob = (JobId) => 
    fetch(`/api/job/apply`, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },

        // make sure to serialize the JSON body
        body: JSON.stringify({JobId}),
    })


// JS to run when rendering HTML /employers/viewjob/:jobid
let jobid;
if(document.querySelector('.card-header')){
    jobId = document.querySelector('.card-header').getAttribute('data-jobid');
   
}else{
    jobId;
    
}

if(window.location.pathname === `/employers/viewjob/${jobId}`){
    const updateJob = (job) => 
        fetch(`/api/updatejob/${job.id}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },  
            body: JSON.stringify(job),
        });
    
    const backBtn = document.querySelector('#backToDashboard');
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        location.href = `http://localhost:3000/employers/dashboard`;
    });

    const editBtn = document.querySelector('#editJob');
    if(editBtn !== null){
        editBtn.addEventListener('click',(e) => {
            e.preventDefault();
            document.querySelector('fieldset').removeAttribute('disabled');
            // change edit button to save button
            editBtn.textContent = 'Update & Save';
            editBtn.id = 'updateJob'
            const updateBtn = document.querySelector('#updateJob');
            updateBtn.addEventListener('click',(e) => {
                e.preventDefault();
                const job = {
                    id: document.querySelector('.card-header').getAttribute('data-jobid'),
                    address:document.querySelector('#jobAddress').value,
                    site_manager: document.querySelector('#siteManager').value,
                    start_date:document.querySelector('#startDate').value.split("-").reverse().join("-"),
                    end_date:document.querySelector('#endDate').value.split("-").reverse().join("-"),
                    number_of_labourers: document.querySelector('#numberLabourers').value,
                }
                updateJob(job)
                .then(() => location.href = `http://localhost:3000/employers/dashboard`)
                .catch((err) => console.log(err));
            })
        })
    }


    const deleteJob = (job) => 
        fetch(`/api/deletejob/${job.id}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },  
            body: JSON.stringify(job)
        }); 

    const deleteBtn = document.querySelector('#deleteJob');
    if(deleteBtn !== null){
        deleteBtn.addEventListener('click',(e) => {
            e.preventDefault();
            const jobId = document.querySelector('.card-header').getAttribute('data-jobid');
            const confirmDelete = confirm(`Do you want to delete Job ID: ${jobId}?`)
            if (confirmDelete){
                const job = {id: jobId}
                deleteJob(job)
                .then(() => location.href = `http://localhost:3000/employers/dashboard`)
                .catch((err) => console.log(err));
            }
        });
    }

    let chosenApplicants = [];
    
    const handleSelectBtn = (e) => {
        e.preventDefault();
        const buttonText = e.currentTarget.textContent;
        if(buttonText === 'Select'){
            let numberOfLabourers = document.querySelector('#numberLabourers').getAttribute('data-numberOfLabourers');
            if (chosenApplicants.length < numberOfLabourers){
                let user = {
                    JobId: document.querySelector('.card-header').getAttribute('data-jobid'),
                    UserId: e.currentTarget.getAttribute('data-userid'),
                }
                chosenApplicants.push(user);
                console.log(`User Counter : ${chosenApplicants.length}`);
                const selectButton = e.currentTarget;
                const userCard = e.currentTarget.parentNode.parentNode;
                userCard.style.backgroundImage = 'linear-gradient(to top, rgba(0,255,42,0.1), rgba(0,255,42,0.5))';
                userCard.style.border = '2px solid black';
                selectButton.textContent = 'Unselect';
            }
        }else{
            let userId = e.currentTarget.getAttribute('data-userid');
            chosenApplicants = chosenApplicants.filter( user => user.UserId != userId);
            console.log(`User Counter : ${chosenApplicants.length}`);
            const unselectButton = e.currentTarget;
            const userCard = e.currentTarget.parentNode.parentNode;
            userCard.style.backgroundImage = null;
            userCard.style.border = null;
            unselectButton.textContent = 'Select';
        }  
    }

    const selectUserBtn = document.querySelectorAll('.selectUser');
    if (selectUserBtn !== null){
        selectUserBtn.forEach(button => button.addEventListener('click',handleSelectBtn));
    }

    const applicantschosen = (users,jobId) =>
        fetch(`/api/applicantschosenfor/${jobId}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },  
            body: JSON.stringify(users)
        });
        
    const choseApplicantsBtn = document.querySelector('#choseApplicantsButton');
    if(choseApplicantsBtn !== null){
        choseApplicantsBtn.addEventListener('click',(e) => {
            e.preventDefault();
            let numberOfLabourers = document.querySelector('#numberLabourers').getAttribute('data-numberOfLabourers');
            if (chosenApplicants.length == numberOfLabourers ){
                console.log(`you have chosen ${chosenApplicants.length} people`);
                let jobId = document.querySelector('.card-header').getAttribute('data-jobid');
                applicantschosen(chosenApplicants,jobId)
                .then(() => location.href = `http://localhost:3000/employers/dashboard`)
                .catch((err) => console.log(err));
            }else{
                alert(`you need to chose ${numberOfLabourers} people`);
            }
        });
    }
    
}
