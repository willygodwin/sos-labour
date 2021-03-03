document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
    const signUpForm = document.querySelector("button.btn-submit-labourer");
    const firstNameInput = document.querySelector("input#first-name");
    const lastNameInput = document.querySelector("input#last-name");
    const dobInput = document.querySelector("input#date-input")
    const driversLicenseInput = document.querySelector("input#driver-license")
    const WhiteCardInput = document.querySelector("input#white-card")
    const skillsInput = document.querySelector("input#skills")

    console.log(firstNameInput.value.trim(),lastNameInput.value.trim(),dobInput.value.trim() )

    signUpForm.addEventListener('click', (event) => {
        console.log('test');
        event.preventDefault();
        const userData = {
            first_name: firstNameInput.value.trim(),
            last_name: lastNameInput.value.trim(),
            dob: dobInput.value.trim(),
            driver_license: driversLicenseInput.value.trim(), 
            whitecard: WhiteCardInput.value.trim(), 
            skills_experience: skillsInput.value.trim()
        };
        if (!userData.email || !userData.password) {
            return;
        }

            // If we have an email and password we run the loginUser function and clear the form
        signUpLabourer({ userData });
        firstNameInput.value = "";
        lastNameInput.value= "";
        dobInput.value= "";
        driversLicenseInput.value= "";
        WhiteCardInput.value= "";
        skillsInput.value= "";
       

    });
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function signUpLabourer(first_name, last_name, dob, driver_license, whitecard, skills_experience ) {
        console.log(first_name, last_name, dob, driver_license, whitecard, skills_experience )
        fetch(`api/labourerdetails`, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
    
            // make sure to serialize the JSON body
            body: JSON.stringify({
                first_name,
                last_name, 
                dob,
                driver_license, 
                whitecard, 
                skills_experience

            }),
            }).then((response) => {
                // Check that the response is all good
                // Reload the page so the user can see the new quote
                if (response.ok) {
                    
                    window.location.href = "/login"; // if all good have to send the user to their dashboard

                    // If there's an error, log the error
                } else {
                    alert('something went wrong!');
                }
            }).catch(handleLoginErr);
    }

    // function signUpUser(email, password, user_type) {
    //     $.post("/api/signup", {
    //       email: email,
    //       password: password,
    //       user_type: user_type
    //     })
    //       .then(function(data) {
    //         // window.location.replace("/labourerdetails");
    //         // If there's an error, handle it by throwing up a bootstrap alert
    //       })
    //       .catch(handleLoginErr);
    //   }
    


    function handleLoginErr(err) {
        const alert = document.querySelector("#alert .msg")
        alert.textContent = err.responseJSON;   
    }

});
