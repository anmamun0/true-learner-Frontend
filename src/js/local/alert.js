const pushAlert = (title, description) => {
    // Create the alert box container
    const alertBox = document.createElement('div');

    // Define the inner HTML of the alert box based on the title
    alertBox.innerHTML = `
<!-- Custom Alert Modal -->
<div id="customAlert" class="fixed z-40 top-0 right-2 md:right-1/3 md:translate-x-1/2 
    transform w-11/12 sm:w-96 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
    
    <div class="flex items-center space-x-2">
        ${
            title === "success" ? `
                <i class="fas fa-check-circle text-green-500 text-2xl"></i>
                <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Success</h2>
            ` : title === "alert" ? `
                <i class="fas fa-times-circle text-red-500 text-2xl"></i>
                <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Alert</h2>
            ` : `
                <i class="fas fa-exclamation-circle text-yellow-500 text-2xl"></i>
                <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Warning</h2>`
        }
    </div>

    <p class="mt-4 text-gray-700 text-sm sm:text-base">${description}</p>

    <div class="mt-6 flex justify-end">
        <button onclick="closeAlert()" 
            class="${title === 'success' ? 'bg-green-500' : title === 'alert' ? 'bg-red-600' : 'bg-yellow-700'} 
            text-white px-4 py-2 rounded-md hover:bg-opacity-80">
            Close
        </button>
    </div>
</div>

    `;

    // Append the alert box to the body
    document.body.appendChild(alertBox);

    // Make the alert visible
    document.getElementById("customAlert").classList.remove("hidden");

    // Optionally, auto-close the alert after a certain time
    setTimeout(() => {
        closeAlert();
    }, 5000); // Close after 5 seconds
}


 // Function to close the alert
const closeAlert = () => {
    const alertBox = document.getElementById("customAlert");
    if (alertBox) {
        alertBox.classList.add("hidden");
        alertBox.remove(); // Remove the alert from DOM after closing
    }
} 