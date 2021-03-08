const handlePostedJobCards = () => {
    const jobCards = document.querySelectorAll('.jobCard');
    jobCards.forEach((job) => {
        job.addEventListener('click',(e) => {
            e.preventDefault();
            // console.log(e.currentTarget);
            const jobId = e.currentTarget.getAttribute('data-jobid');
            const origin = window.location.origin;
            location.href = `${origin}/employers/viewjob/${jobId}`
        })
    });
}

const updateJob = (job) => 
    fetch(`/api/updatejob/${job.id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify(job),
    });

const deleteJob = (job) => 
    fetch(`/api/deletejob/${job.id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify(job)
    }); 
const applicantschosen = (users,jobId) =>
    fetch(`/api/applicantschosenfor/${jobId}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify(users)
    });
    
const handleBackBtn = () => {
    const backBtn = document.querySelector('#backToDashboard');
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/employers/dashboard`;
    });
}

const handleEditBtn = () => {
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
                .then(() => {
                    const origin = window.location.origin;
                    location.href = `${origin}/employers/dashboard`; 
                })
                .catch((err) => console.log(err));
            })
        })
    }
}

const handleDeleteBtn = () => {
    const deleteBtn = document.querySelector('#deleteJob');
    if(deleteBtn !== null){
        deleteBtn.addEventListener('click',(e) => {
            e.preventDefault();
            const jobId = document.querySelector('.card-header').getAttribute('data-jobid');
            const confirmDelete = confirm(`Do you want to delete Job ID: ${jobId}?`)
            if (confirmDelete){
                const job = {id: jobId}
                deleteJob(job)
                .then(() => {
                    const origin = window.location.origin;
                    location.href = `${origin}/employers/dashboard`
                })
                .catch((err) => console.log(err));
            }
        });
    }
}
let chosenApplicants = [];
const selectBtnEvent = (e) => {
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
const handleSelectUserBtn = () => {
    const selectUserBtn = document.querySelectorAll('.selectUser');
    if (selectUserBtn !== null){
        selectUserBtn.forEach(button => button.addEventListener('click',selectBtnEvent));
    }
}

const handleChoseApplicantsBtn = () => {
    const choseApplicantsBtn = document.querySelector('#choseApplicantsButton');
    if(choseApplicantsBtn !== null){
        choseApplicantsBtn.addEventListener('click',(e) => {
            e.preventDefault();
            let numberOfLabourers = document.querySelector('#numberLabourers').getAttribute('data-numberOfLabourers');
            if (chosenApplicants.length == numberOfLabourers ){
                console.log(`you have chosen ${chosenApplicants.length} people`);
                let jobId = document.querySelector('.card-header').getAttribute('data-jobid');
                applicantschosen(chosenApplicants,jobId)
                .then(() => {
                    const origin = window.location.origin;
                    location.href = `${origin}/employers/dashboard`;
                })
                .catch((err) => console.log(err));
            }else{
                alert(`you need to chose ${numberOfLabourers} people`);
            }
        });
    }
}

const handleDashboardSidebar = () => {
    const dashboard = document.querySelector('#dashboardText');
    dashboard.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/employers/dashboard`
    })
}

const handleViewPostedJobSidebar = () => {
    const viewPostedJob = document.querySelector('#viewPostedJobsText');
    viewPostedJob.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/employers/viewpostedjobs`
    })
}


const handlePostJobSidebar = () => {
    const postJob = document.querySelector('#postJobText');
    postJob.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/employers/postnewjob`

    })
}


const handlePostNewJobBtn = () => {
    const postJobBtn = document.querySelector('.postJobBtn');
    postJobBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/employers/postnewjob`

    })
}

const postJob = (job) => 
    fetch(`/api/postnewjob`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify(job),
    });


const handleSubmitNewJobBtn = () => {
    const submitJob = document.querySelector('#submitNewJobBtn')
    submitJob.addEventListener('click',(e) => {
        e.preventDefault();
        const newJobData = {
            address:document.querySelector('#job-address').value,
            site_manager: document.querySelector('#site-manager').value,
            start_date:document.querySelector('#start-date').value.split("-").reverse().join("-"),
            end_date:document.querySelector('#end-date').value.split("-").reverse().join("-"),
            number_of_labourers: document.querySelector('#labour-quantity').value,
        }
        postJob(newJobData)
        .then(() => {
            const origin = window.location.origin;
            location.href = `${origin}/employers/dashboard`;
        })
        .catch((err) => console.log(err));
    })
}

handleDashboardSidebar();
handleViewPostedJobSidebar();
handlePostJobSidebar();

// JS to run when rendering HTML /employers/dashboard
if (window.location.pathname === '/employers/dashboard'){
    handlePostedJobCards(); 
    handlePostNewJobBtn();
} else if (window.location.pathname === '/employers/postnewjob'){
    handleSubmitNewJobBtn();
} else if(window.location.pathname === '/employers/viewpostedjobs'){

} else{
    handleBackBtn();
    handleEditBtn();
    handleDeleteBtn();
    handleSelectUserBtn();
    handleChoseApplicantsBtn();
}


