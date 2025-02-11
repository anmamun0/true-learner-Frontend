var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1, // For screens < 640px
    },
    640: {
      slidesPerView: 2, // For screens >= 640px
    },
    1024: {
      slidesPerView: 3, // For screens >= 1024px
    },
  },
});


document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    let countTo = parseInt(counter.getAttribute('data-count'));
    let count = 0;

    const waypoint = new Waypoint({
      element: counter,
      handler: function () {
        let interval = setInterval(function () {
          counter.innerText = count++;
          if (count > countTo) {
            clearInterval(interval);
          }
        }, 20);
        waypoint.destroy();
      },
      offset: 'bottom-in-view'
    });
  });
});

 
// Function for animated counting
function animateCounter(id, endValue) {
  let element = document.getElementById(id);
  let startValue = 0;
  let duration = 1000; // Animation duration in milliseconds
  let increment = endValue / (duration / 20);

  let interval = setInterval(() => {
      startValue += increment;
      element.textContent = Math.floor(startValue);
      if (startValue >= endValue) {
          clearInterval(interval);
          element.textContent = endValue; // Ensure final value is exact
      }
  }, 20);
}

// Function to fetch and update counters
function updateCounters() {
  fetch(`https://truelearner-backends.onrender.com/user/instructors/`)
      .then(res => res.json())
      .then(data => {
          let totalInstructors = data.length;
          animateCounter("index_total_instructors", totalInstructors);
      })
      .catch(error => console.error("Error fetching instructors:", error));

  fetch(`https://truelearner-backends.onrender.com/user/students/`)
      .then(res => res.json())
      .then(data => {
          let totalStudents = data.length;
          animateCounter("index_total_students", totalStudents);
      })
      .catch(error => console.error("Error fetching students:", error));

  fetch(`https://truelearner-backends.onrender.com/course/courses/`)
      .then(res => res.json())
      .then(data => {
          let totalCourses = data.length;
          animateCounter("index_total_courses", totalCourses);
      })
      .catch(error => console.error("Error fetching courses:", error));
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", updateCounters);





const popular_courses = document.getElementById('popular_courses');

fetch(`https://truelearner-backends.onrender.com/course/courses/`)
  .then(res => res.json())
  .then(data => {
    popular_courses.innerHTML = '';
    console.log('Fetched Courses:', data);

    // Sort courses by total_student in descending order and take the top 3
    const topCourses = data.sort((a, b) => b.total_student - a.total_student).slice(0, 3);
    
    // Render only the top 3 courses
    topCourses.forEach(course => {
        popular_courses.innerHTML += `
             <!-- Course Card -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div class="relative">
                    <img src="${course.thumble}" alt="Course Image" class="w-full h-48">
                    <div class="absolute bottom-2 right-2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-md">
                        $ ${course.price}
                    </div>
                </div>
                <div class="p-4">
                    <span class="text-sm text-indigo-700 font-semibold uppercase">${course.category? `${course.category[0]}` : 'None' }</span>
                    <h3 class="text-lg font-bold text-gray-800 mt-1">${course.title}</h3>
                    <div class="flex items-center text-gray-600 text-sm mt-2">
                        <span class="mr-4"><i class="fas fa-user"></i> ${course.total_student} Students</span>
                        <span><i class="fas fa-book"></i> ${course.total_lecture} Lectures</span>
                    </div>
                </div>
            </div>
        `;
    });
  })
  .catch(error => console.error('Error fetching courses:', error));

 