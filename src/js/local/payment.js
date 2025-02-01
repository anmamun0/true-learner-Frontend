
const initiatePayment = (user_id, course_id) => {   
    if (!isAuthenticated()) {
        window.location.href = './login.html';
    }
    
    if (!isStudent()) {
        pushAlert('alert', "You are not a student!");
        return;
    }
    
    fetch(`https://truelearner-backends.onrender.com/payment/pay/${user_id}/${course_id}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json()) // Expect JSON response
    .then(data => {
        if (data.url) {
            console.log("Redirecting to:", data.url);
            window.open(data.url, "_blank");  // Redirect user to SSLCOMMERZ payment page
        } else {
            console.error("Error:", data.error);
            alert("Payment initialization failed: " + data.error);
        }
    })
    .catch(error => console.error("Fetch error:", error));
}
  

