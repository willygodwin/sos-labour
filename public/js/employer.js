const handleViewJobBtn = () => {
    const jobCards = document.querySelectorAll('.view-job-btn');
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

const handleMapIcon =() => {
    const map = document.querySelectorAll('.map-icon')
    map.forEach((icon) => {
        icon.addEventListener('click', (e) =>{
            e.preventDefault();
            const address = e.currentTarget.getAttribute('data-jobAddress').toLowerCase().replace(/[\s,-/.]+/g, '+')
            console.log(address);
            window.open(
                `https://www.google.com/maps/place/${address}`,
                '_blank'
            );``
        })
    })
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
                    id: e.currentTarget.getAttribute('data-jobid'),
                    address:document.querySelector('#job-address').value,
                    suburb: document.querySelector('#job-suburb').value,
                    city:document.querySelector('#job-city').value,
                    state:document.querySelector('#job-state').value,
                    postcode:document.querySelector('#job-postcode').value,
                    site_manager: document.querySelector('#site-manager').value,
                    start_date:document.querySelector('#start-date').value,
                    end_date:document.querySelector('#end-date').value,
                    number_of_labourers: document.querySelector('#labour-quantity').value,
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
            const jobId = e.currentTarget.getAttribute('data-jobid');
            let divEl = document.createElement('div');
            divEl.innerHTML = ` Do you want to delete this job? <span id="confirm-delete"><button id="yes-btn">YES</button><button id=""no-btn>NO</button></span>`
            e.currentTarget.insertAdjacentElement("afterend",divEl);
            let confirmDelete = document.querySelector('#confirm-delete');
            confirmDelete.addEventListener('click', (e) => {
                e.preventDefault();
                let value = e.target.textContent;
                if (value == 'YES'){
                    const job = {id: jobId}
                    deleteJob(job)
                    .then(() => {
                        const origin = window.location.origin;
                        location.href = `${origin}/employers/dashboard`
                    })
                    .catch((err) => console.log(err));
                }else{
                    window.location.reload();
                }
            })

            // const confirmDelete = confirm(`Do you want to delete Job ID: ${jobId}?`)
            // if (confirmDelete){
            //     const job = {id: jobId}
            //     deleteJob(job)
            //     .then(() => {
            //         const origin = window.location.origin;
            //         location.href = `${origin}/employers/dashboard`
            //     })
            //     .catch((err) => console.log(err));
            // }
        });
    }
}
let chosenApplicants = [];
const selectBtnEvent = (e) => {
    e.preventDefault();
    const buttonText = e.currentTarget.textContent;
    if(buttonText === 'Select'){
        let numberOfLabourers = document.querySelector('#labour-quantity').getAttribute('data-numberOfLabourers');
        if (chosenApplicants.length < numberOfLabourers){
            let user = {
                JobId: document.querySelector('#editJob').getAttribute('data-jobid'),
                UserId: e.currentTarget.getAttribute('data-userid'),
            }
            chosenApplicants.push(user);
            console.log(`User Counter : ${chosenApplicants.length}`);
            const selectButton = e.currentTarget;
            const userCard = e.currentTarget.parentNode.parentNode;
            userCard.style.boxShadow = '4px 4px 8px -2px rgba(0,0,0,1)';
            const photoBackground = e.currentTarget.parentNode.previousElementSibling.children[0];
            photoBackground.style.backgroundColor = 'white'
            const labourerName = e.currentTarget.parentNode.previousElementSibling.children[1];
            labourerName.style.backgroundColor = '#007fe659';
            selectButton.textContent = 'Unselect';
        }
    }else{
        let userId = e.currentTarget.getAttribute('data-userid');
        chosenApplicants = chosenApplicants.filter( user => user.UserId != userId);
        console.log(`User Counter : ${chosenApplicants.length}`);
        const unselectButton = e.currentTarget;
        const userCard = e.currentTarget.parentNode.parentNode;
        userCard.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
        const photoBackground = e.currentTarget.parentNode.previousElementSibling.children[0];
        photoBackground.style.backgroundColor = null;
        const labourerName = e.currentTarget.parentNode.previousElementSibling.children[1];
        labourerName.style.backgroundColor = null;
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
            let numberOfLabourers = document.querySelector('#labour-quantity').getAttribute('data-numberOfLabourers');
            if (chosenApplicants.length == numberOfLabourers ){
                console.log(`you have chosen ${chosenApplicants.length} people`);
                let jobId = document.querySelector('#editJob').getAttribute('data-jobid');
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


const postJob = (job) => 
    fetch(`/api/postnewjob`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify(job),
    });


const validatePostJobForms = (data) => {
    if (data.address.trim == ''){
        
    }
}
const handleSubmitNewJobBtn = () => {
    const submitJob = document.querySelector('#submitNewJobBtn')
    submitJob.addEventListener('click',(e) => {
        e.preventDefault();
        const newJobData = {
            address:document.querySelector('#job-address').value,
            suburb: document.querySelector('#job-suburb').value,
            city:document.querySelector('#job-city').value,
            state:document.querySelector('#job-state').value,
            postcode:document.querySelector('#job-postcode').value,
            site_manager: document.querySelector('#site-manager').value,
            start_date:document.querySelector('#start-date').value,
            end_date:document.querySelector('#end-date').value,
            number_of_labourers: document.querySelector('#labour-quantity').value,
        }
        postJob(newJobData)
        .then(() => {
            const origin = window.location.origin;
            location.href = `${origin}/employers/viewpostedjobs`;
        })
        .catch((err) => console.log(err));
    })
}

const handleSummaryTab = () => {
    let summary = document.querySelector('#summary-text');
    summary.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/employers/dashboard`

    })
}
const handleCalendarTab = () => {
    let calendar = document.querySelector('#calendar-text');
    calendar.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/employers/dashboard/calendar`

    })
}

const setMinDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

    let minDate = `${yyyy}-${mm}-${dd}`;
    document.querySelector('#start-date').setAttribute('min',minDate);
    document.querySelector('#end-date').setAttribute('min',minDate);
}

handleDashboardSidebar();
handleViewPostedJobSidebar();
handlePostJobSidebar();

// JS to run when rendering HTML specific HTML
if (window.location.pathname === '/employers/dashboard'){
    handleViewJobBtn();
    handleCalendarTab();
    handleMapIcon();
} else if (window.location.pathname === '/employers/dashboard/calendar') {
    handleSummaryTab();
} else if (window.location.pathname === '/employers/postnewjob'){
    handleSubmitNewJobBtn();
    setMinDate();
} else if(window.location.pathname === '/employers/viewpostedjobs'){
    handleMapIcon();
    handleViewJobBtn(); 
} else{
    handleEditBtn();
    handleDeleteBtn();
    handleSelectUserBtn();
    handleChoseApplicantsBtn();
    setMinDate();
}


