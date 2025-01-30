 // Handle form submission
 document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Perform form validation
    if (currentPassword && newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
            // Example of submitting data (you can integrate with backend here)
            const formData = new FormData();
            formData.append('currentPassword', currentPassword);
            formData.append('newPassword', newPassword);
            formData.append('confirmPassword', confirmPassword);

            // Simulate form submission with SweetAlert confirmation
            Swal.fire({
                icon: 'success',
                title: 'Password Changed',
                text: 'Your password has been changed successfully.',
                confirmButtonText: 'Okay'
            });

            // Reset form (optional)
            document.getElementById('changePasswordForm').reset();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'New password and confirm password do not match.',
                confirmButtonText: 'Try Again'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please fill in all the fields.',
            confirmButtonText: 'Try Again'
        });
    }
});