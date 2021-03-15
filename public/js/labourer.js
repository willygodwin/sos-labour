const handleViewAppliedJob = () => {
    const viewAppliedJob = document.querySelector('#viewAppliedJobsText');
    // console.log(jobCards);
    viewAppliedJob.addEventListener('click',(e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/labourers/viewappliedjob`;
    });
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
            );
        })
    })
}

const handleSummaryTab = () => {
    let summary = document.querySelector('#summary-text');
    summary.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/labourers/dashboard`

    })
}
const handleCalendarTab = () => {
    let calendar = document.querySelector('#calendar-text');
    calendar.addEventListener('click', (e) => {
        e.preventDefault();
        const origin = window.location.origin;
        location.href = `${origin}/labourers/dashboard/calendar`

    })
}

handleDashboardSidebar();
handleViewAppliedJob();
handleSearchJobSidebar();

if (window.location.pathname === '/labourers/dashboard'){
    handleMapIcon();
    handleCalendarTab();
}    

if (window.location.pathname === '/labourers/dashboard/calendar'){
    handleSummaryTab();
}

if (window.location.pathname === '/labourers/viewappliedjob'){
    handleResignBtn();
    handleMapIcon();
}

if(window.location.pathname === '/labourers/jobsearch'){
    handleMapIcon();
}
