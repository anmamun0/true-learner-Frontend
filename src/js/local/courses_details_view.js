const user_id = localStorage.getItem('user_id');
let videos = [];


const showDetails = (course_id) => { 
    const title = document.getElementById('course_details_title');
    const course_price = document.getElementById('course_price');
    const description = document.getElementById('course_details_description');
    const image = document.getElementById('course_details_image');
    const instructor_name = document.getElementById('instructor_name');
    const instructor_bio = document.getElementById('instructor_bio');
    const instructor_image = document.getElementById('instructor_image');
    const course_total_lectures = document.getElementById('course_total_lectures');
    const course_total_sections = document.getElementById('course_total_sections');
    const course_total_length = document.getElementById('course_total_length');

    fetch(`http://127.0.0.1:8000/course/courses/${course_id}`)
        .then(res => res.json())
        .then(course => {
            // Parse the description HTML and extract plain text
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(course.description, 'text/html');
            const plainTextDescription = htmlDoc.body.textContent || '';
            const enroll_now = document.getElementById('enroll_now')
            enroll_now.onclick = () =>  {
                initiatePayment(user_id, course.code);
            };
 
            console.log(course);
            title.innerText = `${course.title}`;
            description.innerHTML = course.description;
            image.src = course.thumble;
            course_total_sections.innerText = course.videos.length;
            course_total_lectures.innerText = parseInt(course.videos.length/7);

            course_price.innerText = course.price>0 ? `$ ${course.price}` : "Free"; 
            videos = []
            course.videos.forEach(vdo => {
                videos.push({ title: vdo.title, duration: "8:55" })
            })
            populateTable();


            // Fetch instructor details
            fetch(`http://127.0.0.1:8000/user/instructors/${course.instructor}/`)
                .then(res => res.json())
                .then(inst => {
                    instructor_name.innerText = inst.username; // Update instructor name
                    instructor_bio.innerText = inst.instructor_profile.bio || 'No bio available'; // Update instructor bio
                    instructor_image.src = inst.instructor_profile.image || 'https://via.placeholder.com/150'; // Update instructor image
                })
                .catch(error => console.log('Error fetching instructor:', error));
        })
        .catch(error => console.log('Error fetching course:', error));
};

 


// Function to populate table with video data
function populateTable() {
    const videoList = document.getElementById("videoList");

    videos.forEach(video => {
        const row = document.createElement("tr");
        row.classList.add("border-t", "border-gray-300");

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
