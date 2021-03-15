// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
    //   console.info('DOM loaded');
    }
    const loginForm = document.querySelector("form.login");
    const emailInput = document.querySelector("input#email-input");
    const passwordInput = document.querySelector("input#password-input");

    loginForm.addEventListener('click', (event) => {
        // console.log('test');
        event.preventDefault();
        const userData = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };
        if (!userData.email || !userData.password) {
            return;
        }

            // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.value = "";
        passwordInput.value= "";
       

    });
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
        fetch(`/api/login`, {
                    method: 'POST',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    },
            
                    // make sure to serialize the JSON body
                    body: JSON.stringify({
                        email,
                        password
                    }),
                    }).then((response) => {
                        // Check that the response is all good
                        // Reload the page so the user can see the new quote
                        if (response.ok) {
                            window.location.replace("/usercheck");
                            // If there's an error, log the error
                        } else {
                            // alert('something went wrong!');
                            handleLoginErr() ;
                            
                        }
                    }).catch(err => {
                        console.log(err)
                    });
            }
            function handleLoginErr() {
                document.getElementById('alert').style.display = "block"
                const alert = document.querySelector("#alert .msg")
                console.log(alert)
                alert.textContent = "Please enter a valid username and password";   
        
            }

});
