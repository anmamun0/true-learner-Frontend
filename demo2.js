const ctx1 = document.getElementById('enrollmentChart').getContext('2d');
new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Enrollments',
            data: [10, 25, 40, 80, 120, 200],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
    }
});

const ctx2 = document.getElementById('revenueChart').getContext('2d');
new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue ($)',
            data: [2000, 3000, 4500, 6000, 8000, 11000],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
    }
});










// image update popup
       // Show popup when edit button is clicked
       document.getElementById('edit-thumbnail-btn').addEventListener('click', function () {
        document.getElementById('popup-Image').classList.remove('hidden');
    });

    // Close popup
    document.querySelectorAll('#close-popup-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.getElementById('popup-Image').classList.add('hidden');
        });
    });


    let selectedImage = null;

    function previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                document.getElementById('previewImage').src = reader.result;
                selectedImage = reader.result; // Store image data
            };
            reader.readAsDataURL(file);
        }
    }

    document.getElementById('save-thumbnail-btn').addEventListener('click', function () {
        if (selectedImage) {
            console.log("Submitted Image:", selectedImage);
        } else {
            console.log("No image selected!");
        }
    });




















// Title and price update ----------------------------------------
       // Show the popup when the edit button is clicked
       document.getElementById('edit-Title').addEventListener('click', function () {
        document.getElementById('popup-Title').classList.remove('hidden');

        // Set the current values of the title and price in the popup fields
        document.getElementById('popupTitle').value = document.getElementById('title').value;
        document.getElementById('popupPrice').value = document.getElementById('price').value;
    });

    // Close the popup when Cancel is clicked
    document.getElementById('cancelButton-Title').addEventListener('click', function () {
        document.getElementById('popup-Title').classList.add('hidden');
    });

    // Log the field values when Save is clicked and update the fields
    document.getElementById('saveButton-Title').addEventListener('click', function () {
        const newTitle = document.getElementById('popupTitle').value;
        const newPrice = document.getElementById('popupPrice').value;

        // Log the new title and price
        console.log("Course Title:", newTitle);
        console.log("Course Price:", newPrice);

        // Update the original title and price fields with the new values
        document.getElementById('title').value = newTitle;
        document.getElementById('price').value = newPrice;

        // Hide the popup after saving
        document.getElementById('popup-Title').classList.add('hidden');
    });


















// update Lecture-Session-Length --------------------------------------------------
    
 // Show the popup when the edit button is clicked
 document.getElementById('edit-Lecture-Session-Length').addEventListener('click', function () {
    document.getElementById('popup-Lecture-Session-Length').classList.remove('hidden');

    // Set the current values in the popup fields
    document.getElementById('popupLecture').value = document.getElementById('total_lecture').value;
    document.getElementById('popupSession').value = document.getElementById('total_session').value;
    document.getElementById('popupLength').value = document.getElementById('total_length').value;
});

// Close the popup when Cancel is clicked
document.getElementById('cancelButton-Lecture-Session-Length').addEventListener('click', function () {
    document.getElementById('popup-Lecture-Session-Length').classList.add('hidden');
});

// Log the field values when Save is clicked and update the fields
document.getElementById('saveButton-Lecture-Session-Length').addEventListener('click', function () {
    const newLecture = document.getElementById('popupLecture').value;
    const newSession = document.getElementById('popupSession').value;
    const newLength = document.getElementById('popupLength').value;

    // Log the new values
    console.log("Total Lecture:", newLecture);
    console.log("Total Session:", newSession);
    console.log("Total Length:", newLength);

    // Update the fields with the new values
    document.getElementById('total_lecture').value = newLecture;
    document.getElementById('total_session').value = newSession;
    document.getElementById('total_length').value = newLength;

    // Hide the popup after saving
    document.getElementById('popup').classList.add('hidden');
});










// delete video for confirmation ---------------------------------------------------------------
let videoToDelete = null;

    // Show confirmation modal on delete button click
    function confirmDelete(button) {
        videoToDelete = button.closest('.flex').parentElement; // Find the parent element of the button
        document.getElementById('delete-confirmation').classList.remove('hidden');
    }

    // Hide modal and do nothing
    document.getElementById('cancel-delete').addEventListener('click', function () {
        document.getElementById('delete-confirmation').classList.add('hidden');
    });

    // Confirm delete and remove video
    document.getElementById('confirm-delete').addEventListener('click', function () {
        if (videoToDelete) {
            // videoToDelete.remove(); // Remove the video item
        }
        document.getElementById('delete-confirmation').classList.add('hidden'); // Hide modal
    });
















// new video upload ---------------------------------------------------------------
 // Show the video section popup modal
 document.getElementById('add-video').addEventListener('click', function() {
    document.getElementById('video-section-modal').classList.remove('hidden');
});

// Close the modal
document.getElementById('close-video-modal').addEventListener('click', function() {
    document.getElementById('video-section-modal').classList.add('hidden');
});

// Handle the video form submission
document.getElementById('video-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get form values
    const videoTitle = document.querySelector('[name="video_title"]').value;
    const videoUrl = document.querySelector('[name="video_url"]').value;
    const videoDuration = document.querySelector('[name="video_duration"]').value;

    // Print values in console
    console.log('Video Title:', videoTitle);
    console.log('Video URL:', videoUrl);
    console.log('Video Duration:', videoDuration);

    // Optionally, you can add the new video to the video container
    const videoItem = document.createElement('div');
    videoItem.classList.add('flex', 'items-center', 'space-x-4', 'border', 'border-gray-300', 'rounded-lg', 'p-4');
    videoItem.innerHTML = `
        <p class="font-semibold text-gray-900">${videoTitle}</p>
        <p class="text-blue-600 cursor-pointer hover:underline">${videoUrl}</p>
        <p class="text-gray-500">${videoDuration}</p>
    `;
    // document.getElementById('video-container').appendChild(videoItem);

    // Hide the modal after submitting
    document.getElementById('video-section-modal').classList.add('hidden');

    // Reset the form fields
    document.getElementById('video-form').reset();
});