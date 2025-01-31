const header = document.querySelector('header');
header.innerHTML = `
<!-- Navbar -->
<nav id="navHeader" class="bg-white bg-opacity-95 shadow-xl text-gray-700  top-0 left-0 w-full z-30 transition-header  " style="box-shadow: 0 4px 6px -1px rgba(56, 2, 107, 0.22);">
 

  <!-- Secondary Bar (Support Links) -->
  <div class="bg-gray-100 text-gray-600 text-sm py-2" id="upper_header">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-4">
      <div class="flex items-center space-x-4">
        <i class="fas fa-envelope"></i>
        <span>anmamun0@gmail.com</span>
      </div>
      <div class="flex space-x-4">
        <a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-blue-500">FAQs</a>
 
        <a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-blue-500">Support</a>
      </div>
    </div>
  </div>
  <hr>
  <!-- Main Navbar -->
  <div class="max-w-7xl mx-auto flex justify-between items-center px-4 py-5">
    <!-- Logo -->
    <a href="#" onclick="showPage('index_page');" class="font-bold flex items-center space-x-2  gap-0">
      <span class="text-lg -mr-2 -mb-1">true</span><span class="text-2xl">Learner</span>
    </a>
    <!-- Navigation Links (Center) -->
    <div class="hidden md:flex space-x-6 text-sm font-medium ">
      <a  href="/"  onclick="showPage('index_page'); event.preventDefault();"  class="hover:text-blue-500">Home</a>
      <div class="relative group">
        <a href="/" onclick="showPage('courses_page'); event.preventDefault();"  class="hover:text-blue-500">Courses</a>
        <!-- Dropdown Menu -->
   
 
        <div class="absolute bg-opacity-90 left-0 top-full pt-5 w-[500px] bg-transparent shadow-lg rounded-lg z-20 hidden group-hover:block">
            <div id="header_reloading" class="absolute left-6 top-6">
            <!-- Digital Reloading Animation with TailwindCSS -->
                <div class="flex font-mono text-teal-400 text-4xl   space-x-3">
                    <div class="dot w-3 h-3 bg-teal-600 rounded-full opacity-0  "></div>
                    <div class="dot w-3 h-3 bg-teal-600 rounded-full opacity-0   delay-200"></div>
                    <div class="dot w-3 h-3 bg-teal-600 rounded-full opacity-0  delay-400"></div>
                </div> 
            </div>
            <div id="header_category"  class="bg-white hidden group-hover:grid grid-cols-2 gap-2 p-4">

            </div>
        </div>

      </div>
       <a href="/" onclick="showPage('instructors'); event.preventDefault();" class="hover:text-blue-500">Instructors</a>
      <a href="#" class="hover:text-blue-500">Contacts</a>

      ${isAuthenticated() ? `
            <a href="#" onclick="logoutUser()" class="hover:text-blue-500">Logout</a> 
        `: `
            <a href="./login.html" class="hover:text-blue-500">Login</a>
            <a href="./register.html" class="hover:text-blue-500">Sign Up!</a>
        `}

    </div>

        <!-- Alpine.js Required for Toggle --> 
        <div x-data="{ open: false }" class="relative">
            <!-- Button -->
            <button @click="open = !open" class="hover:text-blue-600 flex items-center space-x-2">
                <i class="fas fa-user text-gray-700" id="fa-user"></i>

            ${isAuthenticated() ? `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    ` : `
                    <a href="./login.html">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                `}

            </button>

            <!-- Dropdown Menu -->
            ${isAuthenticated() ? `
                 <div  x-show="open"  @click.away="open = false" id="account_header"  class="absolute right-0 mt-4 mr-8 w-40 bg-white   shadow-lg rounded-lg z-10" x-transition >
                    <ul>
                        <li> <a href="./profile.html" class="block px-4 py-2  rounded-lg transition-all duration-300 ease-in-out transform hover:ml-2">Profile</a> </li>
                        <li> <a href="#" onclick="logoutUser()" class="block px-4 py-2  rounded-lg transition-all duration-300 ease-in-out transform hover:ml-2">Logout</a> </li>
                    </ul>
                </div>
                `: `
                
                `}
           
        </div>


    <!-- Mobile Menu Button -->
    <button id="mobileMenuBtn" class="md:hidden focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
  </div>
  <!-- Mobile Menu -->
  <div id="mobileMenu" class="hidden md:hidden bg-white shadow-lg rounded-lg mt-4 px-4 py-2">
    <a  href="/"  class="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">Home</a>
    <a href="#courses_page" onclick="showPage('courses_page')";  class="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg" >Courses</a>
    <a href="#" class="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">Instructors</a>
    <a href="#" class="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">Contacts</a>
    ${isAuthenticated() ? `
        <a href="#" onclick="logoutUser()"  class="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">Logout</a>
        ` : `
        <a href="./login.html"  class="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">Login</a>
        <a href="./register.html"  class="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">Sign Up!</a>
        `}
  
  </div>
</nav>
`;
 // Toggle mobile account dropdown (if applicable)
document.getElementById('mobileAccountBtn')?.addEventListener('click', function() {
    const menu = document.getElementById('mobileAccountMenu');
    menu.classList.toggle('hidden');
  });
  
  // Mobile menu toggle logic
  document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
  });
  
  
const header_category = document.getElementById('header_category'); 
fetch(`http://127.0.0.1:8000/course/category/`)
    .then(r => r.json())
    .then(category => {
        category.forEach(cat => {
            header_category.innerHTML += `
                <a href="#" onclick="showPage('courses_page'); courseShow('${cat.slug}')"  class="border-b-[1px] border-gray-200 border-opacity-30 block text-sm px-2 py-1  transition-all duration-300 ease-in-out transform hover:ml-2">
                ${cat.name} </a>         
            
            `;
        }) 
      document.getElementById('header_reloading').innerHTML = '';
})




const whiteHeader = () =>
{
  try {
    
      ['navHeader', 'header_category', 'account_header'].forEach(id => {
        const el = document.getElementById(id);
        if (id === 'navHeader') el.className = "bg-white bg-opacity-95 text-gray-700  top-0 left-0 w-full z-30 transition-header ";
        else el.classList.remove('bg-gray-700');
      });
      document.getElementById('fa-user').classList.add('text-gray-700'); 
  }
  catch(error){}

}
    
const blackHeader = () =>
{
  try {
      ['navHeader', 'header_category', 'account_header'].forEach(id => {
        const el = document.getElementById(id);
        if (id === 'navHeader') el.className = "bg-gray-700 bg-opacity-95 text-gray-100 top-0 left-0 w-full z-50 transition-header";
        else el.classList.add('bg-gray-700');
      });
      document.getElementById('fa-user').classList.add('text-white'); 
    }
    catch(error){}
}

const setCustomUrl = (string) => {
  let Url = window.location.href;
  let result = Url.split("?")[0]; 

  let newUrl = result + "?" + string;
  window.history.pushState({}, "", newUrl); 

}
    

    

 








    
 
window.onload = function () {
  const functionCall = localStorage.getItem('localCall');
  if (functionCall) {
      eval(functionCall); // This will execute 'myFunction()'
  }
  console.log(functionCall);
};

// window.addEventListener("beforeunload", function(event) {
//   // Customize the message here, though modern browsers often ignore custom text
//   event.returnValue = "Are you sure you want to leave?"; // Required for some browsers (like Chrome)
//   alert("You are reloading the page!"); // This will trigger the alert
// });

const showPage = (page, course_id = 0) =>
{ 

  const pages = ['index_page', 'courses_page', 'course_details','instructors','support']; // List of page IDs
  
  localStorage.setItem('localCall', `showPage('${page}','${course_id}');`)
  if (page === 'index_page')
  {
    localStorage.removeItem('localCall');
    document.getElementById('upper_header').classList.remove('hidden');
    whiteHeader(); 
    window.location.href='/'
  } 

  let fullUrl = window.location.href;  
  if (fullUrl.includes('html')) { 
    window.location.href = '/'; 
  }
  


  pages.forEach((id) => {
    const element = document.getElementById(id); // Get the element by ID
    if (id === page) {
      element.classList.remove('hidden'); // Show the selected page
    } else {
      element.classList.add('hidden'); // Hide the other pages
    }
  });

    if (page !== 'index_page') {
        document.getElementById('upper_header').classList.add('hidden');
    }
    
  
  if (page === 'courses_page') {  
    whiteHeader();  
    setCustomUrl('courses'); 
    courseShow();
  }

  if (page === 'course_details') {  
    blackHeader(); 
    const newURL = `courses/${course_id}`;
    setCustomUrl(newURL);
    showDetails(course_id);
  }

  if (page === 'instructors') {
    whiteHeader();
    setCustomUrl('instructors');
  }
  if (page === 'support') {
    whiteHeader();
    setCustomUrl('support');
  }
};





const nav = document.getElementById('navHeader');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  let currentScroll = window.scrollY;
  nav.classList.toggle('scroll-down', currentScroll > lastScroll);
  nav.classList.toggle('scroll-up', currentScroll < lastScroll || currentScroll === 0);
  lastScroll = currentScroll;
});

// <!-- Navbar -->
// <nav id="navHeader" class="bg-gray-200 z-10 text-gray-800 font-semibold py-3  rounded-lg shadow-md fixed top-0 left-0 w-full ">
//     <div class="max-w-7xl mx-auto flex justify-between items-center px-6">
//         <a href="/" class=" text-3xl font-bold flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-800 mr-2" fill="none" viewBox="0 0 24 24"
//                 stroke="currentColor">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                     d="M12 8c-1.3 0-2.3.8-2.3 2.3 0 1.4 1.1 2.3 2.3 2.3s2.3-.9 2.3-2.3C14.3 8.8 13.3 8 12 8z" />
//                 <circle cx="12" cy="12" r="10" />
//             </svg>
//             TrueLearner
//         </a>
//         <div class="hidden md:flex space-x-6">
//             <a href="/"  onclick="showPage('index_page')"  class=" hover:text-blue-500">Home</a>
//             <a href="#features" class=" hover:text-blue-500">Features</a> 
//             <a href="#courses_page" onclick="showPage('courses_page'); " class=" hover:text-blue-500">Courses</a>
//              <div class="relative group">
//                 <button class=" hover:text-blue-600 flex items-center">
//                     Account <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
//                 </button>
//                 <div class="absolute right-0 mt-0 w-40 bg-white shadow-lg rounded-lg z-10 hidden group-hover:block">
//                     <ul>
//                     ${isAuthenticated() ? `
//                         <li><a href="./profile.html"  class="block px-4 py-2 text-gray-800 rounded-lg hover:bg-gray-100">Profile</a></li>
//                         <li><a href="/" onclick="logoutUser()" class="block px-4 py-2 text-gray-800 rounded-lg hover:bg-gray-100">Logout</a></li>
//                     ` : `
//                         <li><a href="/login.html" class="block px-4 py-2 text-gray-800 rounded-lg hover:bg-gray-100">Login</a></li>
//                         <li><a href="/register.html" class="block px-4 py-2 text-gray-800 rounded-lg hover:bg-gray-100">Register</a></li>
//                     `}
                    
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         <button class="md:hidden " onclick="toggleMenu()">
//             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
//             </svg>
//         </button>
//     </div>
//     <div id="mobile-menu" class="hidden md:hidden px-6 py-4 bg-white shadow-md">
//         <a href="#features" class="block py-2 text-gray-800 hover:bg-gray-100">Features</a>
//         <a href="#courses_page" class="block py-2 text-gray-800 hover:bg-gray-100">Courses</a>
//         <a href="#about" class="block py-2 text-gray-800 hover:bg-gray-100">About</a>
//     </div>
// </nav>