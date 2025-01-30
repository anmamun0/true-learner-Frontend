// + create Couse

 
// Initialize Quill.js editor
const quill = new Quill("#editor", {
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

                <input   type="url"  name="video_url[]"
                class="w-1/2 rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
                placeholder="Video URL" required
                />
                <button type="button"
                class="text-gray-900 px-4 py-2 rounded-lg  hover:scale-105 transition flex items-center space-x-2"
                onclick="removeVideo(this)" >
                <i class="fas fa-trash"></i> </button>
                `;
    container.appendChild(videoGroup);
});

function removeVideo(button) {
    button.parentElement.remove();
}



document.getElementById("form_create_course").addEventListener("submit", function (event) {
    document.getElementById("description").value = document.getElementById("editor").innerHTML;
  });

document.getElementById("form_create_course").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission to the server
  
    const formData = new FormData(this); // Create FormData object
  
    console.log("Form Data:");
  
    // Log all fields (excluding videos)
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
  });
  
  
  
//   Form Data:
// title: We Care About Your Privacy
// instructor: dsfasdf
// thumbnail: [object File]
// price: 34
// description:
// Videos:
//   Video 1:
//     Title: asdfasdfasdf
//     URL: https://youtube.com
//   Video 2:
//     Title: k
//     URL: https://facebook.com




