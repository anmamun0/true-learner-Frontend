
const course_page_loadings = document.getElementById('course_page_loading');
course_page_loadings.classList.remove('hidden');



const categroyView = () => {
    const category_list = document.getElementById('category_list'); 
    category_list.innerHTML = '';

    fetch(`https://truelearner-backends.onrender.com/course/category/`)
        .then(r => r.json())
        .then(categorys => { 
            categorys.forEach(cat => {
                category_list.innerHTML += `
                <a onclick="courseShow('${cat.slug}')"  >
                    <div class="flex justify-between  items-center text-sm py-2 w-full ">
                        <span class="font-semibold text-gray-800 hover:text-indigo-800 cursor-pointer">${cat.name}</span>
                        <span class="text-gray-400">(${cat.course_count})</span> 
                    </div>
                </a>
                `;
            });  

        })
        .catch(e => console.error(e));
};

// Call the function to populate the categories
categroyView(); 


const courseShow = (slug = '') => {
    course_page_loadings.classList.remove('hidden');
    console.log(slug);
    const course_card = document.getElementById('course_card');
    const searchCourses = document.getElementById('searchCourses');
    
    // Determine the API endpoint based on whether a slug is passed
    const apiUrl = slug 
        ? `https://truelearner-backends.onrender.com/course/courses/?category=${slug}` 
        : 'https://truelearner-backends.onrender.com/course/courses/';

    // Fetch courses data from the server
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            document.getElementById('total_category').innerText = data.length;
            // Store the fetched courses for later use
            let courses = data;

            // Function to display courses based on selected view
            const displayCourses = (filteredCourses, isListView) => {
                course_card.innerHTML = '';  // Clear existing course cards

                filteredCourses.forEach(course => {
                    // Parse the description HTML and extract plain text
                    
                    const parser = new DOMParser();
                    const htmlDoc = parser.parseFromString(course.description, 'text/html');
                    const plainTextDescription = htmlDoc.body.textContent || '';

                    // Set course card structure based on view type 
                    let courseCardHTML = ``;
                    if (isListView) {
                        // List View: image on the right side and content on the left side
                        courseCardHTML = `
                            <div class="bg-white shadow-lg p-4 rounded-xl   shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-lg transition duration-300 course-card" >
                                <div class="flex">
                                    <!-- List view image on the right side -->
                                    <img src="${course.thumble}" alt="Course Thumbnail" class="w-24 h-24 object-cover ml-4">
                                    
                                    <!-- Course content on the left side -->
                                    <div class="px-6 py-4 flex-1">
                                        <h3 class="text-md font-semibold text-gray-900 mb-2">${course.title}</h3>
                                        <p class="text-gray-600 mb-3 text-sm">${plainTextDescription.slice(0, 100)}...</p>
                                
                                        
                                        <div class="flex gap-2 items-center mb-2 text-xs ">
                                            <span class="text-gray-500"><i class="fas fa-user text-gray-500 mr-2"></i> <span class="">${course.students} Students</span></span>
                                            <span class="text-gray-400"><i class="fas fa-file-alt text-gray-600 mr-2"></i> <span class="">${course.total_lecture} Lessons</span></span>
                                        </div>

                                        <div class="flex justify-between items-center">
                                            <span class="text-lg font-bold text-indigo-600">$${course.price}</span>
                                            <a href="" onclick="showPage('course_details','${course.code}');event.preventDefault();" class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow hover:from-indigo-500 hover:to-purple-500 transition">View</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    } else {
                        // Grid View: image on top and content underneath
                        courseCardHTML = `
                         <div class="bg-white rounded-xl w-full shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-lg transition duration-300 mt-4 relative">
                            <img src="${course.thumble}" alt="Course Thumbnail" class="w-full h-48 object-cover">
                            <div class="px-6 py-4 pb-20"> <!-- Add extra padding at the bottom to avoid overlap -->
                                <h3 class="text-md font-semibold text-gray-900 mb-2">${course.title}</h3>
                                <p class="text-gray-600 mb-2 text-xs">${plainTextDescription.slice(0, 70)}.</p>
                             
                            </div>

                            <!-- Price and button are fixed to the bottom -->
                            <div class="absolute bottom-4 left-6 right-6 "> 
                                <!-- Additional Course Info -->
                                    <div class="flex gap-2 items-center mb-2 text-xs ">
                                        <span class="text-gray-500"><i class="fas fa-user text-gray-500 mr-2"></i> <span class="">${course.students} Students</span></span>
                                        <span class="text-gray-400"><i class="fas fa-file-alt text-gray-600 mr-2"></i> <span class="">${course.total_lecture} Lessons</span></span>
          
                                    </div>
                            
                                <div class="flex justify-between items-center">
                                
                                    <span class="text-lg font-bold text-indigo-600">$${course.price} </span>
                                    <a href="" onclick="showPage('course_details','${course.code}');event.preventDefault();" class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow hover:from-indigo-500 hover:to-purple-500 transition">
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>

                        `;
                    } 
                    // Append the generated course card HTML to the course card container
                    course_card.innerHTML += courseCardHTML;
                    
                });
            };

            // Display all courses initially in Grid View
            displayCourses(courses, false);

            // Listen for input event on the search field
            searchCourses.addEventListener('input', () => { 
                const query = searchCourses.value.toLowerCase();  // Get search query and convert to lowercase

                // Filter courses based on title
                const filteredCourses = courses.filter(course => 
                    course.title.toLowerCase().includes(query)
                );

                // Display filtered courses based on the selected view
                const isListView = document.getElementById('listViewBtn').classList.contains('active');
                displayCourses(filteredCourses, isListView); 

            });

            // Handle grid view and list view toggle
            const gridViewBtn = document.getElementById('gridViewBtn');
            const listViewBtn = document.getElementById('listViewBtn');

            // When Grid view button is clicked
            gridViewBtn.addEventListener('click', () => {
                course_card.classList.add('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');  // Remove grid classes
                course_card.classList.remove('grid-cols-1');  // Add list style (1 column)
            
                // Mark active view button
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');

                // Display courses in grid view
                const filteredCourses = courses.filter(course => 
                    course.title.toLowerCase().includes(searchCourses.value.toLowerCase())
                );
                displayCourses(filteredCourses, false);
            }); 
            // When List view button is clicked
            listViewBtn.addEventListener('click', () => {
                course_card.classList.remove('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');  // Remove grid classes
                course_card.classList.add('grid-cols-1');  // Add list style (1 column)
            
                // Mark active view button
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');

                // Display courses in list view
                const filteredCourses = courses.filter(course => 
                    course.title.toLowerCase().includes(searchCourses.value.toLowerCase())
                );
                displayCourses(filteredCourses, true);
            });
            course_page_loadings.classList.add('hidden');
        })
        .catch(error => console.log(error));
};

 
// Smooth scroll functionality
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
}); 


 