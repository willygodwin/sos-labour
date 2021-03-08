
// JS to run when rendering HTML /employers/dashboard
if (window.location.pathname === '/labourers/jobsearch'){
    const applyButtons = document.querySelectorAll('.btn-apply');
    
    // console.log(jobCards);
    applyButtons.forEach((apply) => {
        apply.addEventListener('click',(e) => {
            e.preventDefault();
            let applyStatus = e.currentTarget.getAttribute('data-status');
            if(applyStatus == 'withdrawn'){
                console.log(e.currentTarget);
                const jobDivApply = e.currentTarget.parentNode.parentNode
                console.log(jobDivApply)
                const jobId = e.currentTarget.getAttribute('data-jobID');
                console.log(jobId);
                e.currentTarget.setAttribute('data-status','applied');
                applyJob(jobId)
                .then((response) => {
                    // Check that the response is all good
                    // Reload the page so the user can see the new quote
                    if (response.ok) {
                        jobDivApply.style.backgroundColor = "green"
                        
                        console.log("successs")// if all good have to send the user to their dashboard
                    } else {
                        alert('something went wrong!');
                    }
                }).catch((err) => console.log(err));
            }

    
            
    
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


