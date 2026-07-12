document.addEventListener("DOMContentLoaded", () => {

    initializeRegister();

});


/*=========================================================
                INITIALIZE
=========================================================*/

function initializeRegister(){

    initializePasswordToggle();

    initializeFormValidation();

}


/*=========================================================
            SHOW / HIDE PASSWORD
=========================================================*/

function initializePasswordToggle(){

    const toggles=document.querySelectorAll(".toggle-password");

    toggles.forEach(toggle=>{

        toggle.addEventListener("click",()=>{

            const input=document.getElementById(toggle.dataset.target);

            if(!input) return;

            if(input.type==="password"){

                input.type="text";

                toggle.classList.remove("fa-eye");

                toggle.classList.add("fa-eye-slash");

            }

            else{

                input.type="password";

                toggle.classList.remove("fa-eye-slash");

                toggle.classList.add("fa-eye");

            }

        });

    });

}


/*=========================================================
                FORM VALIDATION
=========================================================*/

function initializeFormValidation(){

    const form=document.getElementById("registerForm");

    if(!form) return;

    form.addEventListener("submit",registerUser);

}
/*=========================================================
                REGISTER USER
=========================================================*/

function registerUser(event){

    event.preventDefault();

    const fullname=document.getElementById("fullname").value.trim();

    const email=document.getElementById("email").value.trim();

    const phone=document.getElementById("phone").value.trim();

    const college=document.getElementById("college").value.trim();

    const branch=document.getElementById("branch").value;

    const year=document.getElementById("year").value;

    const password=document.getElementById("password").value;

    const confirmPassword=document.getElementById("confirmPassword").value;

    const terms=document.getElementById("terms").checked;


    if(fullname.length<3){

        showMessage("Please enter a valid full name.","error");

        return;

    }


    if(!validateEmail(email)){

        showMessage("Please enter a valid email address.","error");

        return;

    }


    if(!validatePhone(phone)){

        showMessage("Please enter a valid phone number.","error");

        return;

    }


    if(college===""){

        showMessage("College name is required.","error");

        return;

    }


    if(branch===""){

        showMessage("Please select your branch.","error");

        return;

    }


    if(year===""){

        showMessage("Please select your year.","error");

        return;

    }


    if(!validatePassword(password)){

        showMessage("Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.","error");

        return;

    }


    if(password!==confirmPassword){

        showMessage("Passwords do not match.","error");

        return;

    }


    if(!terms){

        showMessage("Please accept Terms & Conditions.","error");

        return;

    }


    const button=document.querySelector(".register-btn");

    button.disabled=true;

    button.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...`;


    setTimeout(()=>{

        const user={

            fullname,

            email,

            phone,

            college,

            branch,

            year

        };

        localStorage.setItem("xtragradUser",JSON.stringify(user));

        showMessage("Registration Successful!","success");

        setTimeout(()=>{

            window.location.href="./role-login.html";

        },1500);

    },2000);

}


/*=========================================================
                EMAIL VALIDATION
=========================================================*/

function validateEmail(email){

    const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


/*=========================================================
                PHONE VALIDATION
=========================================================*/

function validatePhone(phone){

    const pattern=/^[6-9]\d{9}$/;

    return pattern.test(phone);

}


/*=========================================================
                PASSWORD VALIDATION
=========================================================*/

function validatePassword(password){

    const pattern=

    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    return pattern.test(password);

}
/*=========================================================
                PASSWORD STRENGTH
=========================================================*/

const passwordInput=document.getElementById("password");

if(passwordInput){

    passwordInput.addEventListener("input",()=>{

        checkPasswordStrength(passwordInput.value);

    });

}

function checkPasswordStrength(password){

    let strength=0;

    if(password.length>=8) strength++;

    if(/[A-Z]/.test(password)) strength++;

    if(/[a-z]/.test(password)) strength++;

    if(/[0-9]/.test(password)) strength++;

    if(/[@$!%*?&]/.test(password)) strength++;

    console.log("Password Strength :",strength,"/5");

}


/*=========================================================
        CONFIRM PASSWORD MATCH
=========================================================*/

const confirmPassword=document.getElementById("confirmPassword");

if(confirmPassword){

    confirmPassword.addEventListener("keyup",()=>{

        if(confirmPassword.value!==passwordInput.value){

            confirmPassword.style.borderColor="#ef4444";

        }

        else{

            confirmPassword.style.borderColor="#22c55e";

        }

    });

}


/*=========================================================
                SHOW MESSAGE
=========================================================*/

function showMessage(message,type){

    let toast=document.createElement("div");

    toast.className=`toast ${type}`;

    toast.innerHTML=`

        <i class="fa-solid ${
            type==="success"
            ? "fa-circle-check"
            : "fa-circle-xmark"
        }"></i>

        <span>${message}</span>

    `;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },400);

    },3000);

}


/*=========================================================
                RESET FORM
=========================================================*/

function resetRegisterForm(){

    const form=document.getElementById("registerForm");

    if(form){

        form.reset();

    }

}


/*=========================================================
                GOOGLE BUTTON
=========================================================*/

const googleBtn=document.querySelector(".google-btn");

if(googleBtn){

    googleBtn.addEventListener("click",()=>{

        showMessage(
            "Google Authentication will be available soon.",
            "success"
        );

    });

}


/*=========================================================
                PAGE LOADED
=========================================================*/

console.log("✅ Register Page Loaded Successfully");
