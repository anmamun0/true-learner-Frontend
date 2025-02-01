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
            instructor_details_image.src = data.instructor_profile.image;
            instructor_details_image.alt = `${data.first_name} ${data.last_name}`;
            instructor_details_bio.textContent = data.instructor_profile.bio;

            instructor_details_social_media.innerHTML = `
                    <li><a href="${data.instructor_profile.website}" target="_blank" class="block bg-gray-400 px-8 py-2 hover:text-blue-600">Website</a></li>
                    <li><a href="${data.instructor_profile.facebook}" target="_blank" class="block bg-gray-400 px-8 py-2 hover:text-blue-600">Facebook</a></li>
                    <li><a href="${data.instructor_profile.twitter}" target="_blank" class="block bg-gray-400 px-8 py-2 hover:text-blue-600">Twitter</a></li>
                    <li><a href="${data.instructor_profile.linkedin}" target="_blank" class="block bg-gray-400 px-8 py-2 hover:text-blue-600">Linkedin</a></li>

            `;
            const instructor_details_course_filed = document.getElementById('instructor_details_course_filed');
             
            data.courses.forEach(course => {
                console.log('asdfasdf', course);
                
                instructor_details_course_filed.innerHTML += `
                  <div class="bg-white rounded-2xl shadow-lg overflow-hidden  ">
                        <img src="${course.thumble}" alt="Course Image" class="w-full h-28 object-cover">
                        <div class="p-4">
                            <h3 class="text-md font-semibold text-gray-800">${course.title}</h3>
                            <p class="text-sm text-gray-600 mt-1">Total Students: <span class="font-semibold">1200+</span></p>
                            <div class="  flex items-center justify-between mt-4 ">
                                <span class="text-md font-bold text-blue-600">$${course.price}</span>
                                <button onclick="showPage('course_details','${course.code}');event.preventDefault();" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">View </button>
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
 