  // Toggle between Instructor and Student sections
  function toggleSection(section) {
    const instructorSection = document.getElementById('instructor-section');
    const studentSection = document.getElementById('student-section');
    const instructorTab = document.getElementById('instructor-tab');
    const studentTab = document.getElementById('student-tab');
    const register_title = document.getElementById('register_title')

      if (section === 'instructor') {
        register_title.innerHTML = `
                <h2 class="text-3xl font-bold">Instructor Register</h2>
                <p class="mt-2 text-sm opacity-80">Register to manage your courses and interact with students.</p>
          `;
        instructorSection.classList.remove('hidden');
        studentSection.classList.add('hidden');

        instructorTab.classList.add('bg-blue-500', 'text-white');
        instructorTab.classList.remove('bg-white', 'text-gray-800');

        studentTab.classList.add('bg-white', 'text-gray-800');
        studentTab.classList.remove('bg-blue-500', 'text-white');
      } else {
          
        register_title.innerHTML = `
        <h2 class="text-3xl font-bold">Student Register  </h2>
        <p class="mt-2 text-sm opacity-80">Register to access your courses and track your progress.</p>
            `;
          
        studentSection.classList.remove('hidden');
        instructorSection.classList.add('hidden');

        studentTab.classList.add('bg-blue-500', 'text-white');
        studentTab.classList.remove('bg-white', 'text-gray-800');

        instructorTab.classList.add('bg-white', 'text-gray-800');
        instructorTab.classList.remove('bg-blue-500', 'text-white');
    }
}


// By default, show the student section
window.onload = function () {
    toggleSection('student');
}; 

// Log form data to console before submitting the form
function logFormData(event, userType) {
    event.preventDefault(); // Prevent form submission to allow logging

    const role = userType.charAt(0).toUpperCase() + userType.slice(1);
    // Get the form data 
    const username = document.getElementById(`${userType}-username`).value;
    const firstName = document.getElementById(`${userType}-first-name`).value;
    const lastName = document.getElementById(`${userType}-last-name`).value;
    const email = document.getElementById(`${userType}-email`).value;
    const phone = document.getElementById(`${userType}-phone`).value;
    const address = document.getElementById(`${userType}-address`).value;
    const password = document.getElementById(`${userType}-password`).value;

    const data = {
        "role": role,
        "username": username,
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "phone": phone,
        "address": address,
        "password": password,
    }  
    if (!username || !firstName || !lastName || !email || !phone || !address || !password) {
        pushAlert('error', 'Please fill in all required fields.');
        return;
    }
    fetch('https://truelearner-backends.onrender.com/user/register/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        pushAlert('success', 'Your account was created successfully!');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
        pushAlert('error', 'Failed to create an account. Try again later.');
    });
}
