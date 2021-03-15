// 'use strict';
 
// const FileReader = require('filereader')

document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
    const signUpForm = document.querySelector("button.btn-submit-labourer");
    const firstNameInput = document.querySelector("input#first-name");
    const lastNameInput = document.querySelector("input#last-name");
    const dobInput = document.querySelector("input#date-input");
    const driversLicenseInput = document.querySelector("input#driver-license");
    const whiteCardInput = document.querySelector("input#white-card");
    const skillsInput = document.querySelector("#skills");
    const profilePicInput = document.querySelector("input#profilePic");

    profilePicInput.addEventListener('change', checkPhoto)



    signUpForm.addEventListener('click', (event) => {
        event.preventDefault();

        if (!firstNameInput.value.trim() || !lastNameInput.value.trim() || !dobInput.value.trim() || !whiteCardInput.value.trim()) {
            document.getElementById('alert').style.display = "block"
            return;
        }

        console.log(profilePicInput.files[0])

        getBase64(profilePicInput.files[0])
            .then((file) => {
            console.log(file)

            fetch("/api/user_data")
            .then(response => response.json())
            .then(function(data) {
                console.log(data.email, data.id)

                const userData = {
                    first_name: firstNameInput.value.trim(),
                    last_name: lastNameInput.value.trim(),
                    dob: dobInput.value.trim(),
                    driver_license: driversLicenseInput.value.trim(), 
                    whitecard: whiteCardInput.value.trim(), 
                    skills_experience: skillsInput.value.trim(),
                    UserId: data.id, 
                    base64IMG: file,
                    img_reference: profilePicInput.files[0]?.name



                };
                

                signUpLabourer( userData );
                
                firstNameInput.value = "";
                lastNameInput.value= "";
                dobInput.value= "";
                driversLicenseInput.value= "";
                whiteCardInput.value= "";
                skillsInput.value= "";

            });
        
        })


        
        console.log('test');
        console.log('first name', firstNameInput.value.trim(),lastNameInput.value.trim(),dobInput.value.trim(),driversLicenseInput.value.trim(), whiteCardInput.value.trim(),skillsInput.value.trim() )
        
        

        
            // If we have an email and password we run the loginUser function and clear the form
        
      
       

    });
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function signUpLabourer( { first_name, last_name, dob, driver_license, whitecard, skills_experience, UserId, base64IMG, img_reference }) {
        console.log(first_name, last_name, dob, driver_license, whitecard, skills_experience )
        fetch(`/api/labourerdetails`, {
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
                skills_experience, 
                UserId,
                base64IMG, 
                img_reference

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

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            
            if(typeof file !== Blob){
                return resolve();
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    function checkPhoto() {
        if(this.files[0].type.indexOf("image") == -1) {
            document.getElementById("photoErr").innerHTML = "File not supported";
            return false;
        }
        if(this.files[0].size > 102400) {
            document.getElementById("photoErr").innerHTML = "Image too big (max 100kb)";
            return false;
        }
        document.getElementById("photoErr").innerHTML = "";
        return true;
    }

    function handleLoginErr(err) {
        const alert = document.querySelector("#alert .msg")
        alert.textContent = err.responseJSON;   
    }

});
