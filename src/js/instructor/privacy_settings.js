  // Handle form submission
  document.getElementById('privacySettingsForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const profileVisibility = document.querySelector('input[name="profileVisibility"]:checked').value;
    const emailNotifications = document.getElementById('emailNotifications').checked;
    const twoFactorAuth = document.getElementById('twoFactorAuth').checked;
    const dataSharing = document.querySelector('input[name="dataSharing"]:checked').value;

    // Example of submitting data (you can integrate with backend here)
    const formData = {
        profileVisibility,
        emailNotifications,
        twoFactorAuth,
        dataSharing
    };

    // Simulate form submission with SweetAlert confirmation
    Swal.fire({
        icon: 'success',
        title: 'Settings Saved',
        text: 'Your privacy settings have been updated successfully.',
        confirmButtonText: 'Okay'
    });

    // Reset form (optional)
    document.getElementById('privacySettingsForm').reset();
});