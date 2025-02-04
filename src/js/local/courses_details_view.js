const user_id = localStorage.getItem('user_id');
 

const showDetails = (course_id) => { 


    const title = document.getElementById('course_details_title');
    const course_price = document.getElementById('course_price');
    const description = document.getElementById('course_details_description');
    const image = document.getElementById('course_details_image');
    const course_details_instructor_name = document.getElementById('course_details_instructor_name');
    const course_details_instructor_bio = document.getElementById('course_details_instructor_bio');
    const course_details_instructor_image = document.getElementById('course_details_instructor_image');
    const course_total_lectures = document.getElementById('course_total_lectures');
    const course_total_lectures2 = document.getElementById('course_total_lectures2');
    const course_total_sections = document.getElementById('course_total_sections');
    const course_total_sections2 = document.getElementById('course_total_sections2');
    const course_total_length = document.getElementById('course_total_length');
    const course_total_length2 = document.getElementById('course_total_length2');

    fetch(`https://truelearner-backends.onrender.com/course/courses/${course_id}`)
        .then(res => res.json())
        .then(course => {
            
            const enroll_now = document.getElementById('enroll_now')
            enroll_now.onclick = () =>  {
                initiatePayment(user_id, course.code);
            }; 
                // Initialize Quill.js editor in read-only mode
                var quill = new Quill('#editor', {
                    theme: 'snow',
                    readOnly: true,  // Disable editing
                    modules: { toolbar: false } // Remove toolbar
                });
                document.getElementById('editor').innerHTML = course.description;
                            
            console.log(course);
            title.innerText = `${course.title}`; 
            image.src = course.thumble;
            course_total_sections.innerText = course.total_session;
            course_total_sections2.innerText = course.total_session;

            course_total_lectures.innerText = course.total_lecture;
            course_total_lectures2.innerText = course.total_lecture;
            
            course_total_length.innerText = course.total_length;
            course_total_length2.innerText = course.total_length;

            course_price.innerText = course.price>0 ? `$ ${course.price}` : "Free"; 
            const videos = []
            course.videos.forEach(vdo => {
                videos.push({ title: vdo.title, duration: vdo.duration })
            })
            populateTable(videos);


            // Fetch instructor details
            fetch(`https://truelearner-backends.onrender.com/user/instructors/${course.instructor}/`)
                .then(res => res.json())
                .then(inst => {

                    course_details_instructor_name.innerText = inst.username; // Update instructor name
                    course_details_instructor_bio.innerText = inst.instructor_profile.bio || 'No bio available'; // Update instructor bio
                    course_details_instructor_image.src = inst.instructor_profile.image || 'https://via.placeholder.com/150'; // Update instructor image
                    document.getElementById('course_details_loading').innerHTML = " ";


                })
                .catch(error => console.log('Error fetching instructor:', error));
        })
        .catch(error => console.log('Error fetching course:', error));
        
    
};

 


// Function to populate table with video data
function populateTable(videos) {
    const videoList = document.getElementById("videoList");

    videos.forEach(video => {
        const row = document.createElement("tr");
        row.classList.add("border-t", "border-gray-700");

        const titleCell = document.createElement("td");
        titleCell.classList.add("px-6", "py-4", "text-sm", "font-medium", "text-gray-400");
        titleCell.textContent = video.title;

        const durationCell = document.createElement("td");
        durationCell.classList.add("px-6", "py-4", "text-sm", "font-medium", "text-gray-400");
        durationCell.textContent = video.duration;

        row.appendChild(titleCell);
        row.appendChild(durationCell);
        videoList.appendChild(row);
    });
}

// Call function to populate the table
