const handleViewAppliedJob = () => {
    const viewAppliedJob = document.querySelector('#viewAppliedJobsText');
    // console.log(jobCards);
    viewAppliedJob.addEventListener('click',(e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/labourers/viewappliedjob`;
    });
};

const handleBackToDashboardBtn = () => {
    const backBtn = document.querySelector('#backToDashboardBtn');
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/labourers/dashboard`;
    })
};

const resignApplication = (jobAddress) => 
        fetch(`/api/resignapplication/${jobAddress}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
        }); 

const handleResignBtn = () => {
    const resignBtn = document.querySelectorAll('.resignBtn');
    resignBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const jobAddress = e.currentTarget.getAttribute('data-jobAddress');
            resignApplication(jobAddress)
            .then(() => location.reload())
            .catch((err) => console.log(err));
        })
    })
};

const handleSearchJobsBtn = () => {
    const searchJobsBtn = document.querySelector('#searchJobsBtn');
    searchJobsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/labourers/jobsearch`;
    })
}

const handleDashboardSidebar = () => {
    const dashboard = document.querySelector('#dashboardText');
    dashboard.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/labourers/dashboard`
    })
}

const handleSearchJobSidebar = () => {
    const searchJob = document.querySelector('#searchJobText');
    searchJob.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/labourers/jobsearch`
    })
}

handleDashboardSidebar();
handleViewAppliedJob();
handleSearchJobSidebar();

if (window.location.pathname === '/labourers/dashboard'){
    handleSearchJobsBtn();
}    

if (window.location.pathname === '/labourers/viewappliedjob'){
    handleResignBtn();
}
