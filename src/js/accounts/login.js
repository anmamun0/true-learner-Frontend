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
        email: email,
        password: password,
        role: role
    };
    
    fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken")  // CSRF token from cookies
        },
        body: JSON.stringify(data),
        credentials: 'include'  // Ensures sessionid is included
    })
        .then(res => res.json())
        .then(data => {
            const non_field_errors = data['non_field_errors'] || '' ;
            if (non_field_errors) {
                pushAlert('warning', non_field_errors);
            }
            else {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('role', role);

                console.log('Login successful:', data);
                pushAlert('success', 'Login successful!');
                window.location.href = '/';

            }
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