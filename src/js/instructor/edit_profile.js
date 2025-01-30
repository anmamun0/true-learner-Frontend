 // Handle form submission
 document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const profilePicture = document.getElementById('profilePicture').files[0];

    // Perform form validation
    if (name && email && phone) {
        // Example of submitting data (you can integrate with backend here)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        if (profilePicture) formData.append('profilePicture', profilePicture);

        // Simulate form submission with SweetAlert confirmation
        Swal.fire({
            icon: 'success',
            title: 'Profile Updated',
            text: 'Your profile has been updated successfully.',
            confirmButtonText: 'Okay'
        });

        // Reset form (optional)
        document.getElementById('editProfileForm').reset();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please fill in all the required fields.',
            confirmButtonText: 'Try Again'
        });
    }
});