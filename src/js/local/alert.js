

 
const pushAlert = (title, description) => {
    // Check if an alert is already displayed and close it
    const existingAlert = document.getElementById("customAlert");
    if (existingAlert) {
        closeAlert(existingAlert); // Close the previous alert if exists
    }

    // Create the alert box container
    const alertBox = document.createElement('div');
    alertBox.className = 'fixed bottom-5 right-5 z-50 animate-slide-in-right';

    // Define the inner HTML of the alert box based on the title
    alertBox.innerHTML = `
        <div id="customAlert" class="relative w-80 bg-white p-6 rounded-lg shadow-lg border-l-4 ${
            title === "success" ? "border-green-500" :
            title === "alert" ? "border-red-500" :
            title === "warning" ? "border-yellow-500" :
            title === "processing" ? "border-blue-500" : "border-gray-500"
        }">
            <!-- Close Button -->
            <button onclick="closeAlert(this.parentElement)" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl">
                &times;
            </button>

            <div class="flex items-center space-x-3">
                ${
                    title === "success" ? `
                        <i class="fas fa-check-circle text-green-500 text-2xl"></i>
                        <h2 class="text-xl font-semibold text-gray-800">Success</h2>
                    ` : title === "alert" ? `
                        <i class="fas fa-times-circle text-red-500 text-2xl"></i>
                        <h2 class="text-xl font-semibold text-gray-800">Alert</h2>
                    ` : title === "warning" ? `
                        <i class="fas fa-exclamation-circle text-yellow-500 text-2xl"></i>
                        <h2 class="text-xl font-semibold text-gray-800">Warning</h2>
                    ` : title === "processing" ? `
                        <i class="fas fa-cog animate-spin text-blue-500 text-2xl"></i>
                        <h2 class="text-xl font-semibold text-gray-800">Processing...</h2>
                    ` : `
                        <i class="fas fa-info-circle text-gray-500 text-2xl"></i>
                        <h2 class="text-xl font-semibold text-gray-800">Info</h2>`
                }
            </div>

            <p class="mt-3 text-gray-700 text-sm">${description}</p>
        </div>
    `;

    // Append the alert box to the body
    document.body.appendChild(alertBox);

    // Auto-close the alert after 5 seconds, except for "processing" type
    if (title !== "processing") {
        setTimeout(() => {
            closeAlert(alertBox);
        }, 5000);
    }
}

// Function to close the alert
const closeAlert = (alertElement) => {
    if (alertElement) {
        alertElement.classList.add('animate-slide-out-right'); // Slide out animation
        setTimeout(() => {
            alertElement.remove();
        }, 500); // Wait for animation to complete before removal
    }
}; 
// Example usage of the function
// Or for error
// pushAlert('alert', 'An error occurred, please try again.');
// Or for warning
// pushAlert('warning', 'This is a warning message.');
// pushAlert('processing', 'This is a warning message.');

// <script src="/alert/alert.js"> </script>
// pushAlert('success', 'You have successfully completed the action.');

