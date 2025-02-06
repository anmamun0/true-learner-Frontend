document.getElementById("showMore").addEventListener("click", function () {
    let aboutText = document.getElementById("aboutText");
    if (aboutText.classList.contains("line-clamp-2")) {
        aboutText.classList.remove("line-clamp-2");
        this.textContent = "Show Less";
    } else {
        aboutText.classList.add("line-clamp-2");
        this.textContent = "Show More";
    }
});


const instructorDetailsProfile = (inst_id ) => {
    fetch(`https://truelearner-backends.onrender.com/user/instructors/${inst_id}/`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const instructor_details_name = document.getElementById('instructor_details_name');
            const instructor_details_username = document.getElementById('instructor_details_username');
            const instructor_details_title = document.getElementById('instructor_details_title');
            const instructor_details_total_students = document.getElementById('instructor_details_total_students');
            const instructor_details_total_courses = document.getElementById('instructor_details_total_courses');
            const instructor_details_image = document.getElementById('instructor_details_image');
            const instructor_details_social_media = document.getElementById('instructor_details_social_media'); 
            const instructor_details_bio = document.getElementById('instructor_details_bio');

            


              // Update Instructor Details
            instructor_details_name.textContent = `${data.first_name} ${data.last_name}` || "Unknown Instructor";
            instructor_details_username.textContent = data.username|| "...";
            instructor_details_title.textContent = data.instructor_profile?.title || "Instructor";
            instructor_details_total_students.textContent = data.instructor_profile?.total_students || 0;
            instructor_details_total_courses.textContent = data.courses.length || 0;  
            instructor_details_image.src = data.instructor_profile.image || 'https://i.pravatar.cc/150' ;
            instructor_details_image.alt = `${data.first_name} ${data.last_name}`;
            instructor_details_bio.textContent = data.instructor_profile.bio || "No here any bio";

            instructor_details_social_media.innerHTML = `
 
    <li>
        <a href="${data.instructor_profile.website}" target="_blank" class="flex items-center space-x-3 px-6 py-2 mb-2 bg-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 shadow-sm">
            <div class="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
                <i class="fas fa-globe text-base"></i>
            </div>
            <span class="text-sm font-semibold text-gray-800">Website</span>
        </a>
    </li>
    <li>
        <a href="${data.instructor_profile.facebook}" target="_blank" class="flex items-center space-x-3 px-6 py-2 mb-2 bg-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 shadow-sm">
            <div class="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
                <i class="fab fa-facebook text-base"></i>
            </div>
            <span class="text-sm font-semibold text-gray-800">Facebook</span>
        </a>
    </li>
    <li>
        <a href="${data.instructor_profile.twitter}" target="_blank" class="flex items-center space-x-3 p-3 px-6 py-2 mb-2 bg-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 shadow-sm">
            <div class="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
                <i class="fab fa-twitter text-base"></i>
            </div>
            <span class="text-sm font-semibold text-gray-800">Twitter</span>
        </a>
    </li>
    <li>
        <a href="${data.instructor_profile.linkedin}" target="_blank" class="flex items-center space-x-3 p-3 px-6 py-2 mb-2 bg-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 shadow-sm">
            <div class="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
                <i class="fab fa-linkedin text-base"></i>
            </div>
            <span class="text-sm font-semibold text-gray-800">Linkedin</span>
        </a>
    </li> 
            `;
            const instructor_details_course_filed = document.getElementById('instructor_details_course_filed');
             
            data.courses.forEach(course => {
                console.log('asdfasdf', course);
                
                instructor_details_course_filed.innerHTML += `
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden my-4 flex flex-col h-full">
                        <!-- Image Section -->
                        <img src="${course.thumble}" alt="Course Image" class="w-full h-28 object-cover">

                        <!-- Content Section -->
                        <div class="p-4 flex flex-col justify-between flex-grow ">
                            <h3 class="text-md font-semibold text-gray-800">${course.title}</h3>
                            <p class="text-sm text-gray-600 mt-1">Total Students: <span class="font-semibold">${course.total_student}</span></p>
                            
                            <!-- Price and Button Section -->
                            <div class="flex items-center justify-between mt-auto">
                                <span class="text-md font-bold text-blue-600">$${course.price}</span>
                                <button onclick="showPage('course_details','${course.code}');event.preventDefault();" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">View</button>
                            </div>
                        </div>
                    </div>

                `;
            });
            
            
            document.getElementById('instructors_details_loading').innerHTML = " ";
        })
        .catch(error => {
            console.log(error);
            
    })
}
 