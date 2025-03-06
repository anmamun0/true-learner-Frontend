// Function to logout the user


function logoutUser() {   
    pushAlert('processing',"wait few second! ")
    const logutData = {
        'token': getToken(),
    }  

    fetch('https://truelearner-backends.onrender.com/user/logout/', {
        method: 'POST', // Use GET for hitting the logout endpoint
        headers: {
            "Content-Type": "application/json", // Optional for GET requests
         },
        body:JSON.stringify(logutData),
     })
    .then(res => res.json() )
    .then(data => { 
        console.log('Logout successful:', data); 
        // localStorage.clear();  
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        pushAlert('success', 'You have been logged out!');  
        showPage('index_page');
        
    })
        .catch(error => {  
        console.error('Error during logout:', error);
        pushAlert('error', 'Logout failed. Please try again later.');
        });


}
