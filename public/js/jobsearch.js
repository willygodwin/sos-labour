
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

                    //change the css of that card to make it green
                    //add a delete request if the job wants to un apply
                    
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


