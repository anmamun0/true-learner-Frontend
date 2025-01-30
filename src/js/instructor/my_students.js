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