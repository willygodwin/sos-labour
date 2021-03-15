document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
    const signUpForm = document.querySelector("button.btn-submit-company");
    const companyNameInput = document.querySelector("input#company-name");
    const abnInput = document.querySelector("input#ABN");


    console.log(companyNameInput.value.trim(),abnInput.value.trim())

    signUpForm.addEventListener('click', (event) => {
        console.log('test');
        event.preventDefault();

        fetch("/api/user_data")
        .then(response => response.json())
        .then(function(data) {
            console.log(data.email, data.id)
            const userData = {
                company_name: companyNameInput.value.trim(),
                abn: abnInput.value.trim(),
                UserId: data.id

            };
            if (!userData.company_name || !userData.abn) {
                document.getElementById('alert').style.display = "block"
                return;
            }

                // If we have an email and password we run the loginUser function and clear the form
            signUpCompany(userData);
            companyNameInput.value = "";
            abnInput.value= "";
        });
       

    });
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function signUpCompany({company_name, abn, UserId}) {
        console.log(company_name, abn)
        fetch(`/api/companydetails`, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
    
            // make sure to serialize the JSON body
            body: JSON.stringify({
                company_name,
                abn, 
                UserId

            }),
            }).then((response) => {
                // Check that the response is all good
                // Reload the page so the user can see the new quote
                if (response.ok) {
                    
                    window.location.href = "/usercheck"; // if all good have to send the user to their dashboard

                    // If there's an error, log the error
                } else {
                    alert('something went wrong!');
                }
            }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        const alert = document.querySelector("#alert .msg")
        alert.textContent = err.responseJSON;   
    }

});