// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
    const signUpForm = document.querySelector("form.signup");
    const emailInput = document.querySelector("input#email-input");
    const passwordInput = document.querySelector("input#password-input");
    const userTypeInput = document.querySelector("select#usertype-input")

    console.log(emailInput.value.trim(),passwordInput.value.trim(),userTypeInput.value.trim() )

    signUpForm.addEventListener('click', (event) => {
        console.log('test');
        event.preventDefault();
        const userData = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
            user_type: userTypeInput.value.trim()

        };
        if (!userData.email || !userData.password) {
            return;
        }

            // If we have an email and password we run the loginUser function and clear the form
        signUpUser(userData.email, userData.password, userData.user_type);
        emailInput.value = "";
        passwordInput.value= "";
       

    });
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    // function signUpUser(email, password, user_type) {
    //     console.log(email, password, user_type)
    //     fetch(`api/signup`, {
    //         method: 'POST',
    //         headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         },
    
    //         // make sure to serialize the JSON body
    //         body: JSON.stringify({
    //             email,
    //             password, 
    //             user_type
    //         }),
    //         }).then((response) => {
    //             // Check that the response is all good
    //             // Reload the page so the user can see the new quote
    //             if (response.ok) {
    //                 if(user_type === "labourer"){
    //                     window.location.replace("/labourerdetails");
    //                 }
    //                 else if (user_type === "company"){
    //                     window.location.replace("/companydetails")
    //                 }
                   
    //                 // If there's an error, log the error
    //             } else {
    //                 alert('something went wrong!');
    //             }
    //         }).catch(handleLoginErr);
    // }

    function signUpUser(email, password, user_type) {
        $.post("/api/signup", {
          email: email,
          password: password,
          user_type: user_type
        })
          .then(function(data) {
            window.location.replace("/labourerdetails");
            // If there's an error, handle it by throwing up a bootstrap alert
          })
          .catch(handleLoginErr);
      }
    


    function handleLoginErr(err) {
        const alert = document.querySelector("#alert .msg")
        alert.textContent = err.responseJSON;   
    }

});



