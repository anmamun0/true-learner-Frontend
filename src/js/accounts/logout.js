// Function to logout the user
function logoutUser() { 
    fetch('http://127.0.0.1:8000/user/logout/', {
        method: 'GET', // Use GET for hitting the logout endpoint
        headers: {
            "Content-Type": "application/json", // Optional for GET requests
            "X-CSRFToken": getCookie("csrftoken") // Include CSRF if required by backend
        },
        credentials: 'include'  // Ensure session cookies are sent
    })
    .then(res => res.json() )
    .then(data => { 
        console.log('Logout successful:', data); 
        // localStorage.clear(); 
        pushAlert('success', 'You have been logged out!'); 
        
    })
        .catch(error => {  
        console.error('Error during logout:', error);
        pushAlert('error', 'Logout failed. Please try again later.');
        });
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    pushAlert('success', 'You have been logged out!');  
    window.location.href = '/';

}
