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
    const watch_paid_loading = document.getElementById('watch_paid_loading');
    watch_paid_loading.classList.remove('hidden');
    
    const video_list = document.getElementById('video_list');
    video_list.innerHTML = ""; // Clear existing videos

    fetch(`https://truelearner-backends.onrender.com/course/courses/${course_id}/`)
        .then(r => r.json())
        .then(course => {
            console.log(course);
            
            document.getElementById("courseTitle").innerText = course.title || "Course Title";
            const course_description = document.getElementById("course_description");
            const course_description_under = document.getElementById("course_description_under");
            course_description.innerHTML = course.description;
            course_description_under.innerHTML = course.description;

            course.videos.forEach((video, index) => {
                const videoCard = document.createElement("div");
                videoCard.className = `rounded-lg bg-gray-200 px-3 py-1 mx-4 hover:transition text-gray-900 overflow-hidden duration-300 video-card`;
                videoCard.setAttribute("data-title", video.title);
                videoCard.setAttribute("data-description", video.description || ".");
                videoCard.setAttribute("data-video-url", video.url);

                videoCard.innerHTML = `
                    <button class="w-full text-left">
                        <div class="flex items-center">
                            <div class="w-16 h-16 rounded-md flex items-center justify-center">
                                <i class="text-lg  fas fa-video"></i>
                            </div>
                            <div>
                                <h3 class="text-md px-2 font-medium  ">Video ${index + 1}: ${video.title}</h3>
                            </div>
                        </div>
                    </button>
                `;

                // Append video card to the list
                video_list.appendChild(videoCard);
            });

            // Attach event listener for video cards
                video_list.addEventListener("click", function (event) {
                    const card = event.target.closest(".video-card");
                    if (!card) return; // Ignore clicks outside video cards

                    // Remove 'bg-blue-600' and reset all to 'bg-gray-200'
                    document.querySelectorAll(".video-card").forEach(c => {
                        c.classList.remove("bg-blue-500", "text-white");
                        c.classList.add("bg-gray-200");
                    });

                    // Add 'bg-blue-600' to the clicked card
                    card.classList.remove("bg-gray-200");
                    card.classList.add("bg-blue-500", "text-white");

                    // Get video details from data attributes
                    const videoUrl = card.getAttribute("data-video-url");
                    const title = card.getAttribute("data-title");
                    const description = card.getAttribute("data-description");

                    // Change video content
                    changeVideo(videoUrl, title, description);
                });

                // Auto-play first video if available
                if (course.videos.length > 0) {
                    changeVideo(course.videos[0].url, course.videos[0].title, course.videos[0].description);
                    
                    // Select first video card and highlight it
                    const firstCard = video_list.querySelector(".video-card");
                    if (firstCard) {
                        firstCard.classList.remove("bg-gray-200");
                        firstCard.classList.add("bg-blue-500", "text-white");
                    }
                }

                watch_paid_loading.classList.add("hidden");
                        })
        .catch(e => console.log("Error loading course:", e));
}

// // Set default video placeholder when the page loads
// window.onload = function () {
//     changeVideo("", "", "");
// };
