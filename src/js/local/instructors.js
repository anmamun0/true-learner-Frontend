let instructors = [];

// Fetch data from API
async function fetchInstructors() {
    try {
        const response = await fetch("http://127.0.0.1:8000/user/instructors/");
        instructors = await response.json(); 
        displayInstructors(instructors);
        instructors_loading = document.getElementById('instructors_loading').innerHTML = '';
        

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to Display Instructors
function displayInstructors(filteredInstructors) {
    const instructorList = document.getElementById("instructorList");
    instructorList.innerHTML = "";
    filteredInstructors.forEach(inst => {
        instructorList.innerHTML += `
            <div class="relative bg-white glass p-5 rounded-xl shadow-2xl hover:shadow-lg transition duration-300 text-center">
                <img src="${inst.instructor_profile?.image || 'https://i.pravatar.cc/150'}" 
                    alt="${inst.first_name || 'Instructor'}" 
                    class="w-24 h-24 object-cover rounded-full mx-auto border-4 border-blue-400 shadow-md">
                <h4 class="text-lg font-semibold text-gray-800 mt-3">
                    ${inst.first_name || 'Unknown'} ${inst.last_name || ''}
                </h4>
                <p class="text-sm text-gray-500">@ ${inst.username|| '...'}</p>
                <p class="text-sm text-gray-500">${inst.instructor_profile?.title || 'No title available'}</p>

                <p class="text-sm text-gray-600 mt-1">
                    👨‍🎓 Students: <span class="font-bold text-blue-500">
                        ${inst.instructor_profile?.total_students || 0}
                    </span>
                </p>
                <a href="/instructor/${inst.id}" 
                    class="  mt-3 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition">
                    View Profile
                </a>
                <div class="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-bold text-white rounded-full shadow-md">Instructor</div>
            </div>
        `;
    });
}

// Live Search Function
function filterInstructors() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let filtered = instructors.filter(inst => 
        (`${inst.first_name} ${inst.last_name}`).toLowerCase().includes(query) ||
        (inst.instructor_profile?.title?.toLowerCase().includes(query))
    );
    displayInstructors(filtered);
}

// Fetch instructors when the page loads
fetchInstructors();