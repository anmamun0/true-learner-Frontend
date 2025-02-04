const manageCourses = () => {
    const manage_courses_list = document.getElementById('manage_courses_list');
    fetch(`https://truelearner-backends.onrender.com/user/instructors/${inst_id}/`)
        .then(res => res.json())
        .then(data => {
            data.courses.forEach(course => {
                manage_courses_list.innerHTML +=
                    `
                    <div class="course-card bg-white shadow-md rounded-lg p-6" id="course1">
                        <img src="${course.thumble}" alt="Course Thumbnail" class="w-full h-32 object-cover rounded-lg">
                         <h3 class="text-md font-semibold text-gray-700 mt-4 truncate">${course.title}</h3>
                        <button onclick="" class="mt-4 text-blue-600 hover:text-blue-800">View Details</button>
                     </div>
                    `;
            })
        })
        .catch(error => console.log(error));
}
manageCourses();



// Add another video input group
document.getElementById("add-video").addEventListener("click", function () {
    const container = document.getElementById("video-container");
    const videoGroup = document.createElement("div");
    videoGroup.className = "flex items-center space-x-4 mt-4";
    videoGroup.innerHTML = `
        <input type="text" name="video_title[]"
            class="w-1/2 rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
            placeholder="Video Title" required />

        <input type="url" name="video_url[]"
            class="w-1/2 rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
            placeholder="Video URL" required />

        <button type="button"
            class="text-gray-900 px-4 py-2 rounded-lg hover:scale-105 transition flex items-center space-x-2"
            onclick="removeVideo(this)">
            <i class="fas fa-trash"></i> </button>
    `;
    container.appendChild(videoGroup);
});

// Remove video input group
function removeVideo(button) {
    button.parentElement.remove();
}



// Handle form submission and include Quill data and video inputs
document.getElementById("form_update_course").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission to the server

    // Get Quill editor content and store in hidden input field
    const description = quill.root.innerHTML; // Quill HTML content
    document.getElementById("description").value = description;

    // Get form data
    const formData = new FormData(this); // Create FormData object

    console.log("Form Data:");

    // Log all fields (excluding video)
    for (let [key, value] of formData.entries()) {
        if (key !== "video_title[]" && key !== "video_url[]") {
            console.log(`${key}: ${value}`);
        }
    }

    // Log video fields (with a loop)
    const videoTitles = formData.getAll("video_title[]");
    const videoUrls = formData.getAll("video_url[]");

    console.log("Videos:");
    videoTitles.forEach((title, index) => {
        console.log(`  Video ${index + 1}:`);
        console.log(`    Title: ${title}`);
        console.log(`    URL: ${videoUrls[index]}`);
    });

    // Example: Show a SweetAlert confirmation
    Swal.fire({
        icon: 'success',
        title: 'Course Updated',
        text: 'The course details have been updated successfully!',
        confirmButtonText: 'Okay'
    });

    // You can now proceed to submit the data to the server (e.g., using AJAX)
});