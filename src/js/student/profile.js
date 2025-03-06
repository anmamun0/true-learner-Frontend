const student_id = localStorage.getItem('user_id');

const tabs = { btnEnrolled: "enrolledSection", btnHistory: "historySection" };

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-contents").forEach(div => {
            div.classList.add("opacity-0", "translate-y-3", "hidden");
            div.classList.remove("opacity-100", "translate-y-0");
        });

        let activeSection = document.getElementById(tabs[btn.id]);
        activeSection.classList.remove("hidden");
        setTimeout(() => {
            activeSection.classList.remove("opacity-0", "translate-y-3");
            activeSection.classList.add("opacity-100", "translate-y-0");
        }, 10);

        // Reset button styles
        document.querySelectorAll(".tab-btn").forEach(b => {
            b.classList.replace("bg-blue-500", "bg-gray-300");
            b.classList.replace("text-white", "text-gray-900");
        });

        // Set clicked button to active state
        btn.classList.replace("bg-gray-300", "bg-blue-500");
        btn.classList.replace("text-gray-900", "text-white");
    });
});





const studentProfile = () => {
    const student_image = document.getElementById('student_image');
    const student_name = document.getElementById('student_name');
    const student_username = document.getElementById('student_username');
    const student_email = document.getElementById('student_email');
    const enroll_count = document.getElementById('enroll_count');
    const completed_courses = document.getElementById('completed_courses');
    const enrolled_courses = document.getElementById('enrolled_courses');
    const certificates_count = document.getElementById('certificates_count');

    const form = document.getElementById('student_profile_update');

    fetch(`https://truelearner-backends.onrender.com/user/students/${student_id}`)
        .then(res => res.json())
        .then(student => {
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
                    <div class="flex flex-col justify-between  bg-white shadow rounded-xl overflow-hidden transform hover:scale-[101%] transition duration-300">
                        <div class="relative">
                            <img src="${course.thumble}" alt="Course Thumbnail"
                                class="w-full h-48 object-cover">
                           
                        </div>

                        <div class="p-6 flex flex-col justify-between  gap-2">
                            <h3 class="text-lg font-bold text-gray-800">${course.title}</h3> 
                            <div class="mt-4 flex justify-between ">
                                <span class="text-blue-500 text-sm font-semibold">Completed: 80%</span>
                                <button onclick="showPage('watch_paid_course','${course.code}')" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">Continue</button>
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

            studentHistory();
            document.getElementById('profile_loading').innerHTML = '';
        })
        .catch(error => console.log(error));
}
studentProfile();


const studentHistory = () => {


    const tableBody = document.getElementById("studentHistoryTable");

    // history
    // Sample data (Replace this with actual data from your backend)
    let user_id = localStorage.getItem('user_id');
    fetch(`https://truelearner-backends.onrender.com/payment/history/?user=${user_id}`)
        .then(res => res.json())
        .then(data => {

            data.forEach(history => {

                fetch(`https://truelearner-backends.onrender.com/course/courses/${history.course}`)
                    .then(res => res.json())
                    .then(course => {
                        const studentHistoryData = [];

                        let demo = {
                            'title': course.title,
                            'date': history.created_on, // You might need to format the date
                            "payment": history.payment,
                            "enroll_type": history.enroll_type
                        };
                        studentHistoryData.push(demo);

                        // Populate the table dynamically
                        studentHistoryData.forEach(item => {
                            let row = `<tr class="border-b hover:bg-gray-100">
                            <td class="p-3 truncate">${item.title}</td>
                            <td class="p-3 text-center">
                                ${new Date(item.date).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                            })}
                            </td> 
                            <td class="p-3 text-center ${item.payment == '0' ? 'bg-green-200 text-green-700' : parseFloat(item.payment) > 0 ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'} "> ${item.payment === '0' ? 'Free' : `$${item.payment}`} </td>                        
                            <td class="p-3 text-center  ${item.enroll_type === 'Paid' ? 'text-green-600' : item.enroll_type === 'Pending' ? 'text-yellow-500' : item.enroll_type === 'error' ? 'text-red-500' : 'text-gray-500'} ">${item.enroll_type}</td>                    
                              <td class="p-3 text-center">
                                <button onclick="showPage('download_receipt','${history.id}');event.preventDefault();" class="text-blue-600 hover:text-blue-800">
                                    <i class="fas fa-download"></i>
                                </button>
                            </td>
                        </tr>`;

                            tableBody.innerHTML += row;
                        });


                    })
                    .catch(error => console.log(error));
                // Use push to add to the array  
            });


        })
        .catch(error => console.log(error));

}




const form = document.getElementById('student_profile_update_form');
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
    console.log(data);
    if (form.elements["image"].files.length == 0) {

        fetch(`https://truelearner-backends.onrender.com/user/students/${student_id}/update/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                pushAlert('success', 'Successfully update, not image ');
                showPage('student_profile');
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

            fetch(`https://truelearner-backends.onrender.com/user/students/${student_id}/update/`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    pushAlert('success', "Updated your profile information");
                    showPage('student_profile');

                })
                .catch(errro => console.log(errro));

        })
        .catch(error => console.log(error));
});






const studentHistoryReceipt = (history_id) => {
    let user_id = localStorage.getItem('user_id');
    const receipt_payment_date = document.getElementById('receipt_payment_date');
    const receipt_transaction_id = document.getElementById('receipt_transaction_id');
    const receipt_total_amount = document.getElementById('receipt_total_amount');

    const receipt_course_title = document.getElementById('receipt_course_title');
    const receipt_course_price = document.getElementById('receipt_course_price');
    const receipt_instructor_name = document.getElementById('receipt_instructor_name');


    fetch(`https://truelearner-backends.onrender.com/payment/history/${history_id}`)
        .then(res => res.json())
        .then(history => {
            receipt_transaction_id.textContent = history.id;
            receipt_total_amount.textContent = history.payment;
            receipt_payment_date.textContent = history.created_on;
            fetch(`https://truelearner-backends.onrender.com/course/courses/${history.course}`)
                .then(res => res.json())
                .then(course => {
                    receipt_course_title.textContent = course.title;
                    receipt_course_price.textContent = course.price;

                    fetch(`https://truelearner-backends.onrender.com/user/instructors/${course.instructor}`)
                        .then(res => res.json())
                        .then(instructor => {
                            receipt_instructor_name.textContent = `${instructor.first_name} ${instructor.last_name} (${instructor.username})`

                            // Store the original HTML before making any changes
                            let originalPage = document.body.innerHTML;

                            document.body.innerHTML = document.getElementById('receipt').outerHTML;
                            window.print();

                            // Restore the original page after printing
                            document.body.innerHTML = originalPage;
                            pushAlert('success', "Transaction PDF loaded.")
                            showPage('student_profile');
                            window.location.reload();

                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));

        })
        .catch(error => console.log(error));
}