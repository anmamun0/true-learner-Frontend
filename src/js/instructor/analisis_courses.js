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

let updateCouse_id = null;

const analisisCourseContent = (code) => {
    updateCouse_id = code;

    document.getElementById('deshboard_loading').classList.remove('hidden');

    const analisis_totalCourses = document.getElementById('analisis_total_courses');
    const analisis_totalStudents = document.getElementById('analisis_total_students');
    const analisis_totalRevenue = document.getElementById('analisis_total_revenue');
    const analisis_completionRate = document.getElementById('analisis_completion_rate');
    const analisis_studentList = document.getElementById('analisis_student_list');
    const course_detailsImage = document.getElementById('course_details_image');
    const create_videoContainer = document.getElementById('create_video_container');
    const analisisDescription = document.getElementById('analisis_description');
    
    const analisisTitle = document.getElementById('analisis_title');
    const analisisCoursePrice = document.getElementById('analisis_course_price');
    const analisis_total_lecture = document.getElementById('analisis_total_lecture');
    const analisis_total_session = document.getElementById('analisis_total_session');
    const analisis_total_length = document.getElementById('analisis_total_length');
    

    fetch(`https://truelearner-backends.onrender.com/course/courses/${code}/`)
        .then(res => res.json())
        .then(data => {
            analisis_totalStudents.innerText = data.total_student;
            analisis_totalRevenue.innerText = "$ " + parseInt(data.total_student)*parseInt(data.price);
            course_detailsImage.src = data.thumble;
            analisisTitle.innerText = data.title;
            analisisCoursePrice.innerText = "$ " + data.price
            analisis_total_lecture.value = data.total_lecture;
            analisis_total_session.value = data.total_session;
            analisis_total_length.value = data.total_length;
            analisisDescription.innerHTML = data.description;

            allVideo = ``;
            data.videos.forEach(video=>{
                allVideo += `
                <!-- Video item -->
                        <div class="flex justify-between items-center text-sm text-gray-700">
                           <!-- Video description -->
                            <div class="flex items-center space-x-3">
                            <p class="font-semibold text-gray-900">${video.title}</p>
                            </div>
            
                                <!-- Time, Click link, and Delete button -->
                            <div class="flex items-center gap-2">
                                    <p class="text-gray-500">${video.duration}</p>
                                     <a href="${video.url}" target="_blank" class="text-blue-600 cursor-pointer hover:underline">link</a>

                                     <div class="flex justify-between gap-2">
                                        <button type="button" class="text-gray-900 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all flex items-center " onclick="confirmDelete(this,'${video.order}')">
                                                    <i class="fas fa-trash"></i>
                                        </button>
                                        <button type="button" class="text-gray-900 hover:text-green-600 mr-2 rounded-lg hover:scale-[103%] transition-all flex items-center " onclick="confirmDelete(this)">
                                                    <i class="fas fa-sync"></i> 
                                        </button>
                                     </div>
                            </div>

                            </div>
                 </div>

                `; 
            })
            create_videoContainer.innerHTML = allVideo;

            analisis_studentList.innerHTML = '';

            fetch(`https://truelearner-backends.onrender.com/course/paid_student/${code}/`)
            .then(r => r.json())
            .then(paid_course => {
                paid_course.students.forEach(student => {
                    analisis_studentList.innerHTML += `
                        <tr>
                            <td class="p-3">${student.user.username}</td>
                            <td class="p-3">${student.user.email}</td>
                            <td class="p-3">JavaScript Mastery</td>
                            <td class="p-3 text-green-600">Active</td>
                        </tr>
                    `;
                })
                document.getElementById('deshboard_loading').classList.add('hidden');

            })
            .catch(error => console.log(error));




        })
        .catch(error => console.log(error));
}

const analisisCourseAllStudents = (code) => {

    
}





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
let videoOrder = null;
    // Show confirmation modal on delete button click
    function confirmDelete(button,order) {
        videoToDelete = button.closest('.flex').parentElement; // Find the parent element of the button
        document.getElementById('delete-confirmation').classList.remove('hidden');
        videoOrder = order;
    }

    // Hide modal and do nothing
    document.getElementById('cancel-delete').addEventListener('click', function () {
        document.getElementById('delete-confirmation').classList.add('hidden');
    });

    // Confirm delete and remove video
    document.getElementById('confirm-delete').addEventListener('click', function () {
        if (videoToDelete) { 

            fetch(`https://truelearner-backends.onrender.com/course/videos/${videoOrder}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }, 
            })
                .then(res => res.json())
                .then(data => { 
                    pushAlert('success', "Delete successfull");
                    videoToDelete.remove(); // Remove the video item 

                })
                .catch(error => {
                    pushAlert('alert', "Delete successfull");
                    console.log(error)
                });
        }
        document.getElementById('delete-confirmation').classList.add('hidden'); // Hide modal
    });
















// new video upload ---------------------------------------------------------------
 // Show the video section popup modal
 document.getElementById('create-New-video').addEventListener('click', function() {
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
    const newVideo = {
        'title': videoTitle,
        'url': videoUrl,
        'duration':videoDuration,
    }
    console.log('newVidoe',updateCouse_id, newVideo);
    fetch(`https://truelearner-backends.onrender.com/course/videos/${updateCouse_id}/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(newVideo),
    })
        .then(res => res.json())
        .then(data => {
            pushAlert('success', "new Video created successfull!");
        })
        .catch(error => console.log(error));

    // Optionally, you can add the new video to the video container
    const videoItem = document.createElement('div');
    videoItem.classList.add('flex', 'items-center', 'space-x-4', 'border', 'border-gray-300', 'rounded-lg', 'p-4');
    videoItem.innerHTML = `
        <p class="font-semibold text-gray-900">${videoTitle}</p>
        <p class="text-blue-600 cursor-pointer hover:underline">${videoUrl}</p>
        <p class="text-gray-500">${videoDuration}</p>
    `;
    // document.getElementById('create_video_container').appendChild(videoItem);

    // Hide the modal after submitting
    document.getElementById('video-section-modal').classList.add('hidden');

    // Reset the form fields
    document.getElementById('video-form').reset();
});