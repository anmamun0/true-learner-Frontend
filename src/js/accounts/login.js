const login_loading = document.getElementById('login_loading');
login_loading.classList.add('hidden');

// Toggle between Instructor and Student sections
   function loginUserToggle(section) {
    const instructorSection = document.getElementById('instructor-section');
    const studentSection = document.getElementById('student-section');
    const instructorTab = document.getElementById('instructor-tab');
    const studentTab = document.getElementById('student-tab');

    if (section === 'instructor') {
        // Show instructor section and set active styles
        instructorSection.classList.remove('hidden');
        studentSection.classList.add('hidden');
        instructorTab.classList.add('bg-white', 'text-gray-800');
        instructorTab.classList.remove('bg-blue-600', 'text-white');
        studentTab.classList.add('bg-blue-600', 'text-white');
        studentTab.classList.remove('bg-white', 'text-gray-800');
    } else {
        // Show student section and set active styles
        studentSection.classList.remove('hidden');
        instructorSection.classList.add('hidden');
        studentTab.classList.add('bg-white', 'text-gray-800');
        studentTab.classList.remove('bg-blue-600', 'text-white');
        instructorTab.classList.add('bg-blue-600', 'text-white');
        instructorTab.classList.remove('bg-white', 'text-gray-800');
    }
}

// By default, show the student section
window.onload = function () {
    loginUserToggle('student');
};

// Function to log form data to the console after form submission
function  loginFormData(event, userType) {
    event.preventDefault(); // Prevent form submission to allow logging
    
    // Get the form data
    
    const email = document.getElementById(`${userType}-email`).value;
    const password = document.getElementById(`${userType}-password`).value;
    const role = userType.charAt(0).toUpperCase() + userType.slice(1);
    // Log the form data
 
    const data = {
        role: role,
        email: email,
        password: password 
    };
    console.log(data);

    login_loading.classList.remove('hidden');
    fetch('https://truelearner-backends.onrender.com/user/login/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
         },
        body: JSON.stringify(data),
     })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            login_loading.classList.add('hidden');

            // console.log(data); 
            const non_field_errors = data['non_field_errors'] || ''; 
            if (non_field_errors !== '') { 
                pushAlert('warning', non_field_errors); 
                return;
            }
            
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('role', role); 

                // console.log('Login successful:', data);
                pushAlert('success', 'Login successful!');
                setInterval(() => {
                    window.location.href = './index.html'
                    
                },1000)
                // showPage('index_page');    
        })
        .catch(error => {
            console.error('Error:', error);
            pushAlert('error', 'Login failed. Please try again.');
        }); 
    
}

// {
//     "token": "18346c1be57caf0012055b3cbc984d4d2e4be066",
//     "user_id": 12,
//     "csrfToken": "9Sxng2BneBjbLmFGkQz8PGX5RhDPYkctl1c5y8a92ppBPDb6Xjs1L7H2o3OKkpD7"
// }

 
 
// password togle for visiable
function togglePassword(field,eyeOpen_icon,eyeClosed_icon) {
    const passwordInput = document.getElementById(field);
    const eyeOpen = document.getElementById(eyeOpen_icon);
    const eyeClosed = document.getElementById(eyeClosed_icon);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";  // Show password
        eyeOpen.classList.add("hidden");  
        eyeClosed.classList.remove("hidden");
    } else {
        passwordInput.type = "password"; // Hide password
        eyeOpen.classList.remove("hidden");
        eyeClosed.classList.add("hidden");
    }
} 


const demoUser = () => {
    document.getElementById('student-email').value = 'al1006mamun@gmail.com';
    document.getElementById('instructor-email').value = 'anmamun0@gmail.com';
    
    document.getElementById('student-password').value = '12345mamun';
    document.getElementById('instructor-password').value = '12345mamun';
}
