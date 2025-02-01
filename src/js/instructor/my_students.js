  // Function to toggle between student details modal
  function viewStudentDetails(studentName) {
    const details = `Here are the detailed information of student: ${studentName}. This can include performance, attendance, and more.`;
    document.getElementById('studentDetails').innerText = details;
    document.getElementById('studentModal').classList.add('active');
}

// Function to close student details modal
function closeModal() {
    document.getElementById('studentModal').classList.remove('active');
}

// Function to filter view based on selection
function filterView(view) {
    if (view === 'all') {
        document.getElementById('courseList').classList.remove('hidden');
        document.getElementById('studentList').classList.add('hidden');
        document.getElementById('enrollmentDetails').classList.add('hidden');
    } else if (view === 'students') {
        document.getElementById('studentList').classList.remove('hidden');
        document.getElementById('courseList').classList.add('hidden');
        document.getElementById('enrollmentDetails').classList.add('hidden');
    } else if (view === 'enrollments') {
        document.getElementById('enrollmentDetails').classList.remove('hidden');
        document.getElementById('courseList').classList.add('hidden');
        document.getElementById('studentList').classList.add('hidden');
    }
}




 const deshboard_loading = document.getElementById('deshboard_loading');

const studentManage = () => { 

    deshboard_loading.classList.remove('hidden');
    const students_totalStudents = document.getElementById('students_totalStudents');
    const students_totalCourses = document.getElementById('students_totalCourses');
    const students_totalEnrollments = document.getElementById('students_totalEnrollments');
    
    fetch(`https://truelearner-backends.onrender.com/user/instructors/${inst_id}/`)
        .then(res => res.json())
        .then(data => { 
            // console.log('inasdf', instructore);
     
            students_totalStudents.textContent = data.instructor_profile.total_students; 
            students_totalCourses.innerText = data.courses.length;  
            const enrollmentsCount = data.courses.reduce((acc, course) => acc + (course.enrollments || 0), 0);
            students_totalEnrollments.innerText = enrollmentsCount;
            
            deshboard_loading.classList.add('hidden');
        })
        .catch(e => {
            console.log(e);
            deshboard_loading.classList.add('hidden');  // Hide loading if there's an error
        });
    
}
 