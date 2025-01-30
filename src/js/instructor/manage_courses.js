   // Function to show course details container and populate the form
   function showCourseDetails(courseId) {
    // Show the course details container
    const courseDetailsContainer = document.getElementById('courseDetailsContainer');
    courseDetailsContainer.classList.remove('hidden');

    // Get course data based on the course ID
    let courseName, instructor, description;
    if (courseId === 'course1') {
        courseName = 'Course 1';
        instructor = 'John Doe';
        description = 'Description for Course 1';
    } else if (courseId === 'course2') {
        courseName = 'Course 2';
        instructor = 'Jane Smith';
        description = 'Description for Course 2';
    } else if (courseId === 'course3') {
        courseName = 'Course 3';
        instructor = 'Sarah Lee';
        description = 'Description for Course 3';
    }

    // Populate the form with the course details
    document.getElementById('courseName').value = courseName;
    document.getElementById('instructor').value = instructor;
    document.getElementById('description').value = description;
}

// Updating total course count dynamically (for demo purposes)
const courseCards = document.querySelectorAll('.course-card');
const courseCount = document.getElementById('courseCount');
courseCount.textContent = courseCards.length;

































// + create Couse
  // Initialize Quill.js editor
  const quill = new Quill("#updator", {
    theme: "snow",
    placeholder: "Write the course description here...",
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    },
});

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