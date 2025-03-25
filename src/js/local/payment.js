
const initiatePayment = (user_id, course_id,price) => {   
    if (!isAuthenticated()) {
        window.location.href = './login.html';
    }
    
    if (!isStudent()) {
        pushAlert('alert', "You are not a student!");
        return;
    }

    if (price == '0') {
        pushAlert('success',`Successfully course enrolled,Lets View your profile`) 
         
    }
    else {
    pushAlert('processing', 'Wait few second! Stay here!')
        
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
            pushAlert('success','loaded payment option!')
            window.open(data.url, "_blank");  // Redirect user to SSLCOMMERZ payment page
        } else {
            console.error("Error:", data.error);
            alert("Payment initialization failed: " + data.error);
        }
    })
    .catch(error => console.error("Fetch error:", error));
}
  

