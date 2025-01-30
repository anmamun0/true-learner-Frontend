// Function to convert YouTube URLs to embed format
function getEmbedURL(videoUrl) {
    if (videoUrl.includes("youtube.com/watch") || videoUrl.includes("youtu.be")) {
        // Extract video ID
        let videoID = videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoID}`;
    }
    // If not a YouTube URL, append "/preview"
    return videoUrl.includes("/preview") ? videoUrl : videoUrl + "/preview"; 
}

// Function to change video and update description
function changeVideo(videoUrl, title, description) {
    const iframe = document.getElementById("videoPlayer");
    const overview = document.getElementById("iframe_overview");

    // Convert video URL to an embeddable format
    iframe.src = getEmbedURL(videoUrl);

    // Hide the overlay
    overview.classList.add('hidden');

    // Update title & description
    document.getElementById("videoTitle").innerText = title || "Video Title";
    document.getElementById("videoDescription").innerText = description || "Click on a video title above to watch the video and see the description.";
}

// Function to load course videos dynamically
function watchCourse(course_id) {
    const video_list = document.getElementById('video_list');
    video_list.innerHTML = ""; // Clear existing videos

    fetch(`http://127.0.0.1:8000/course/courses/${course_id}/`)
        .then(r => r.json())
        .then(course => {
            document.getElementById("courseTitle").innerText = course.title || "Course Title";
            document.getElementById("course_details_description").innerHTML = course.description || "Course course_details_description";

            course.videos.forEach((video, index) => {
                const videoCard = document.createElement("div");
                videoCard.className = `rounded-lg bg-gray-800 px-4 py-2 mx-4 hover:transition duration-300 video-card`;
                videoCard.setAttribute("data-title", video.title);
                videoCard.setAttribute("data-description", video.description || ".");
                videoCard.setAttribute("data-video-url", video.url);

                videoCard.innerHTML = `
                    <button class="w-full text-left">
                        <div class="flex items-center">
                            <div class="w-16 h-16 rounded-md flex items-center justify-center">
                                <i class="text-lg text-white fas fa-video"></i>
                            </div>
                            <div>
                                <h3 class="text-md font-medium text-white">Video ${index + 1}: ${video.title}</h3>
                            </div>
                        </div>
                    </button>
                `;

                // Append video card to the list
                video_list.appendChild(videoCard);
            });

            // Attach event listener for video cards
            video_list.addEventListener('click', function (event) {
                const card = event.target.closest('.video-card');
                if (!card) return; // Ignore clicks outside video cards

                // Remove active class from all video cards
                document.querySelectorAll('.video-card').forEach(c => c.classList.remove('bg-blue-600'));

                // Add active class to the clicked card
                card.classList.add('bg-blue-600');

                // Get video details from data attributes
                const videoUrl = card.getAttribute('data-video-url');
                const title = card.getAttribute('data-title');
                const description = card.getAttribute('data-description');

                // Change video content
                changeVideo(videoUrl, title, description);
            });

            // Auto-play first video if available
            if (course.videos.length > 0) {
                changeVideo(course.videos[0].url, course.videos[0].title, course.videos[0].description);
                // Add active class to the first video card
                video_list.querySelector('.video-card').classList.add('bg-blue-600');
            }
        })
        .catch(e => console.log("Error loading course:", e));
}

// Set default video placeholder when the page loads
window.onload = function () {
    changeVideo("", "", "");
};
