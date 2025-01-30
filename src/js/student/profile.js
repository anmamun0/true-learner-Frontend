const student_id = localStorage.getItem('user_id');


const studentProfile = () => {  
    const student_image = document.getElementById('student_image');
    const student_name = document.getElementById('student_name');
    const student_username = document.getElementById('student_username');
    const student_email = document.getElementById('student_email');
    const enroll_count = document.getElementById('enroll_count');
    const completed_courses = document.getElementById('completed_courses');
    const enrolled_courses = document.getElementById('enrolled_courses');
    const certificates_count = document.getElementById('certificates_count');

    const form = document.getElementById('student_update');

    fetch(`http://127.0.0.1:8000/user/students/${student_id}`)
        .then(res => res.json())
        .then(student => {
            console.log(student); 
            student_image.src = student.student_profile.image || '';  
            enroll_count.innerText = student.student_profile.courses.length || 0; 
            student_image.src = student.student_profile.image 
            student_name.innerText = student.first_name;
            student_username.innerText = student.username;
            student_email.innerText = student.email; 
            certificates_count.innerText = student.student_profile.courses.length || "No ";

            const all_courses = student.student_profile.courses
            all_courses.forEach(course => {
                enrolled_courses.innerHTML += `
                     <!-- Course Card -->
                    <div class="bg-white shadow rounded-xl overflow-hidden transform hover:scale-[101%] transition duration-300">
                        <div class="relative">
                            <img src="${course.thumble}" alt="Course Thumbnail"
                                class="w-full h-48 object-cover">
                           
                        </div>
                        <div class="p-6">
                            <h3 class="text-lg font-bold text-gray-800">${course.title}</h3> 
                            <div class="mt-4 flex justify-between items-center">
                                <span class="text-blue-500 text-sm font-semibold">Completed: 80%</span>
                                <button onclick="showProfilePage('watch_course','${course.code}')" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">Continue</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            form.querySelector('[name="username"]').value = student.username;
            form.querySelector('[name="email"]').value = student.email;
            form.querySelector('[name="first_name"]').value = student.first_name;
            form.querySelector('[name="last_name"]').value = student.last_name;
            form.querySelector('[name="phone"]').value = student.student_profile ? student.student_profile.phone : '';
            form.querySelector('[name="about"]').value = student.student_profile ? student.student_profile.bio : '';
            form.querySelector('[name="address"]').value = student.student_profile.address;

        })
        .catch(error => console.log(error));
}
studentProfile();






const form = document.getElementById('student_update');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission (page reload)
    
    const formData = new FormData(form); // Get the form data
  
    // console.log('yy ',data); // Log the data object
    console.log(formData.get('image'), 'asdfasdf'); 
    
    // // Log the form data to the console
    // for (let [name, value] of formData.entries()) {
    //     console.log(name + ": " + value); // Logs the name and value of each field
    // } 
    const data = {
        "username": formData.get('username'), // Use get() to access values
        "first_name": formData.get('first_name'),
        "last_name": formData.get('last_name'),
        "email": formData.get('email'),
        "phone": formData.get('phone'),
        "address": formData.get('address'),
        "bio": formData.get('about')
    };


    if (form.elements["image"].files.length == 0) {

        fetch(`http://127.0.0.1:8000/user/students/${student_id}/update/`, {
            method: 'PUT',
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert('Successfully update, not image ');
            })
            .catch(errro => console.log(errro));
        
        return;
    }


    const imageForm = new FormData(); 
    const imageFile = form.elements["image"].files[0];
    if (imageFile) {
        imageForm.append("image", imageFile);
    }
  
    fetch('https://api.imgbb.com/1/upload?key=99af3bf39b56183ca39470aa2ea81b31',
        {
            method: 'POST',
            body: imageForm,
        }
    )
        .then(res => res.json())
        .then(resData => {

            imageURL = resData.data.display_url;  
            console.log('updated image', imageURL); 
            data.image = imageURL;
            
            fetch(`http://127.0.0.1:8000/user/students/${student_id}/update/`, {
                method: 'PUT',
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    alert('adsf');
                })
                .catch(errro => console.log(errro));
             
        })
        .catch(error => console.log(error));
       
    
});









// Show profile page
const showProfilePage = (page,course_id=0) => { 
    const pages = ['profile', 'profile_edit', 'watch_course'];

    pages.forEach((id) => {
        const element = document.getElementById(id);
        if (id === page) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
    if (page === 'watch_course')
    {
        watchCourse(course_id);
        document.getElementById('upper_header').classList.add('hidden');
 
        document.getElementById('navHeader').className = "bg-gray-700 bg-opacity-95 text-white  top-0 left-0 w-full z-50 transition-header  ";
        document.getElementById('header_category').classList.add('bg-gray-700');
        document.getElementById('account_header').classList.add('bg-gray-700');
        document.getElementById('fa-user').classList.add('text-white');
    }
};
