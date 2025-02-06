// let lastScrollTop = 0;
//         const button = document.getElementById("backHome");

//         window.addEventListener("scroll", function () {
//             let scrollTop = window.scrollY;

//             if (scrollTop > lastScrollTop) {
//                 // Scroll Down → Hide Button (Move Up & Fade)
//                 button.style.transform = "translateY(-50px)";
//                 button.style.opacity = "0";
//             } else {
//                 // Scroll Up → Show Button (Move Down & Fade In)
//                 button.style.transform = "translateY(0)";
//                 button.style.opacity = "1";
//             }
//             lastScrollTop = scrollTop;
//         });


// side nav var control

function showContent(sectionId,course_id=0) {
    // Hide all sections
    document.querySelectorAll('.content').forEach((section) => {
        section.classList.add('hidden');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }
    const pages = ['deshboard', 'create-course', 'manage-courses', 'analisis_courses','students', 'edit-profile', 'privacy-settings']
    
    if (sectionId === 'analisis_courses')
    {
        analisisCourseContent(course_id);
    }
}



//  account setting
// Toggle function to show/hide nested menu
// Function to toggle visibility of nested menu
const toggleSubMenu = () => {
    const menu = document.getElementById('account-settings-menu');
    menu.classList.toggle('hidden');
}

// Show the nested menu when the account setting button is clicked
document.getElementById('account_setting_button').addEventListener('click', (event) => {
    const menu = document.getElementById('account-settings-menu');
    menu.classList.toggle('hidden');
});

// Hide the nested menu when clicking anywhere outside of the sidebar or button
document.addEventListener('click', (event) => {
    const menu = document.getElementById('account-settings-menu');
    const button = document.getElementById('account_setting_button');
    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.add('hidden');
    }
});



const inst_id = localStorage.getItem('user_id');
const instructore = {};


const instinfo = () => {
    document.getElementById('deshboard_loading').classList.remove('hidden');

    const totalCourses = document.getElementById('totalCourses');
    const totalStudents = document.getElementById('totalStudents');
    const recentEnrollments = document.getElementById('recentEnrollments');
    const last_activity_courses = document.getElementById('last_activity_courses');

    // student section
    const students_totalStudents = document.getElementById('students_totalStudents');
    const students_totalCourses = document.getElementById('students_totalCourses');
    const students_totalEnrollments = document.getElementById('students_totalEnrollments');
    const student_course_list_table = document.getElementById('student_course_list_table');
    const student_student_list_table = document.getElementById('student_student_list_table');
    

    fetch(`https://truelearner-backends.onrender.com/user/instructors/${inst_id}/`)
        .then(res => res.json())
        .then(data => {
            // instructore = data;
            console.log(data);
            totalCourses.innerText = data.courses.length;
            totalStudents.innerText = data.instructor_profile.total_students
            recentEnrollments.innerText = data.courses.length;

            let i = 0;
            data.courses.forEach(cur => {
                i++;

                if (i > 3) return;

                last_activity_courses.innerHTML += `
                        <div  class="font-medium text-gray-800">New Course Added: " ${cur.title}</div>
                        <span class="text-sm text-gray-500">2 hours ago</span>
                `;
            })

            const bestSeller = () => { 
                data.courses.sort((a, b) => b.total_student - a.total_student);

                data.courses.forEach(course => {
                    document.getElementById('bestSellerCourse').innerHTML += ` 
                            <div class="flex z-1 items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 relative">
                            <!-- Course Thumbnail -->
                            <img src="${course.thumble}" alt="Course Thumbnail" class="w-24 h-24 object-cover rounded-md">
                    
                            <!-- Course Details -->
                            <div class="ml-4 flex-1">
                            <h2 class="text-lg font-semibold text-gray-800 hover:text-blue-500 transition">${course.title}</h2>
                                <p class="text-gray-500 text-sm">by <span class="font-medium text-gray-700">John Doe</span></p>
                                <p class="text-gray-600 text-sm">Total Students: <span class="font-semibold">${course.total_student}</span></p>
                                <p class="text-gray-600 text-sm">Duration: <span class="font-semibold">${course.total_length} hours</span></p>
                     
                                <!-- Rating -->
                                <div class="flex items-center text-yellow-400 mt-1">
                                    ★★★★☆ <span class="text-gray-600 text-xs ml-1">(4.5/5, 1,250 Reviews)</span>
                                </div>
                            </div>
                    
                            <!-- Bestseller Badge (Only if the course is a bestseller) -->
                            <div class="absolute top-2 right-2 bg-yellow-400 text-gray-700 text-xs px-3 py-1 rounded-full font-semibold">
                                Bestseller
                            </div>
                        </div>
                    `;
                    const total_student = course.total_student;
                    const title = course.title;
                    console.log(`${title} - ${total_student} students`);
                });
            }
            bestSeller();




            // student section: 
            students_totalStudents.textContent = data.instructor_profile.total_students; 
            students_totalCourses.innerText = data.courses.length;  
            let cnt = 0; 
            console.log('chacking', data.courses);
            data.courses.forEach(course =>
            {
                cnt += course.total_student;

                student_course_list_table.innerHTML += `
                <tr class="border-b hover:bg-gray-50">
                        <td class="p-3">${course.title}</td>
                        <td class="p-3">${course.total_student}</td>
                </tr>`; 

                fetch(`https://truelearner-backends.onrender.com/course/paid_student/${course.code}/`)
                    .then(res => res.json())
                    .then(paid_coures => {
                        paid_coures.students.forEach(sdnt => {
                            student_student_list_table.innerHTML += ` 
                                    <td class="p-4 ">
                                        <div class="flex flex-col">
                                            <span class="text-md font-semibold text-gray-900 whitespace-nowrap">${sdnt.user.first_name} ${sdnt.user.last_name}</span>
                                            <span class="text-sm text-gray-500">@${sdnt.user.username}</span>
                                        </div>
                                    </td>
                                    <td class="p-4 text-gray-700 whitespace-nowrap">${sdnt.user.email}</td>
                                    <td class="p-4 text-gray-700">${sdnt.phone}</td>
                                    <td class="p-4 text-gray-700 whitespace-nowrap">${sdnt.address}</td>
                                    <td class="p-4 text-center whitespace-nowrap">
                                        <a href="${sdnt.facebook}" target="_blank"
                                            class="text-blue-600 mx-2 text-xl hover:text-blue-800 transition duration-200">
                                            <i class="fab fa-facebook"></i>
                                        </a>
                                        <a href="${sdnt.facebook}" target="_blank"
                                            class="text-blue-600 mx-2 text-xl hover:text-blue-800 transition duration-200">
                                            <i class="fab fa-linkedin"></i>
                                        </a>
                                    </td> 
                            `;
                        });
                    })
                    .catch(error => console.log(error));
            }) 
            students_totalEnrollments.innerText = cnt;

            //$  course _create section 
            showAllCateogry();

            manageCourses();



        })
        .catch(e => console.log(e));
}
instinfo();





const deshboardHeader = () => {
    
    fetch(`https://truelearner-backends.onrender.com/user/instructors/${inst_id}/`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('deshboard_username').innerText = data.username;
            document.getElementById('deshboard_user_image').src = data.instructor_profile.image;
        })
        .catch(e => console.log(e));
}

deshboardHeader();


//  pannel tootle
const undermenuToggle = document.getElementById('under-menu-toggle');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
});
undermenuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
});