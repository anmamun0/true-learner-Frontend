
const initiatePayment = (user_id, course_id) => {   
    if (!isAuthenticated()) {
        window.location.href = './login.html';
        }
    
    fetch(`http://127.0.0.1:8000/payment/pay/${user_id}/${course_id}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json()) // Expect JSON response
    .then(data => {
        if (data.url) {
            console.log("Redirecting to:", data.url);
            window.location.href = data.url;  // Redirect user to SSLCOMMERZ payment page
        } else {
            console.error("Error:", data.error);
            alert("Payment initialization failed: " + data.error);
        }
    })
    .catch(error => console.error("Fetch error:", error));
}
  

