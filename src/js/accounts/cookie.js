  function isAuthenticated() {
    const sessionId = localStorage.getItem('token');  // Get session cookie (if using session-based auth)
    return sessionId !== null;
}

const isStudent = () => { 
    const role = localStorage.getItem('role');
    return role == 'Student';
}

// alert(getToken()); 

const getToken = () => {
    
    return localStorage.getItem('token');
} 

// Helper function to get cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}