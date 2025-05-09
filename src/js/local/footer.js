const footer = document.querySelector('footer')
footer.innerHTML = `
<!-- Footer Section -->
<div class="relative bg-gradient-to-br   from-gray-100 to-gray-200 text-gray-900 py-16  border-t-[1px] border-gray-300">
  <div class="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg"></div>
  
  <div class="relative max-w-7xl px-6 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
    
    <!-- About Us -->
    <div>
      <h3 class="text-2xl font-semibold   mb-4">About Us</h3>
      <p class=" leading-relaxed">
        Unlock your potential with our top-quality online courses. Learn, grow, and achieve your dreams today.
      </p>
    </div>

    <!-- Quick Links -->
    <div>
      <h3 class="text-2xl font-semibold   mb-4">Quick Links</h3>
      <ul class="space-y-2">
        <li><a href="/"  onclick="showPage('index_page'); event.preventDefault();"  class="hover:text-indigo-400 transition duration-300">Home</a></li>
        <li><a href="/"  onclick="showPage('courses_page'); event.preventDefault();"  class="hover:text-indigo-400 transition duration-300">Courses</a></li>
        <li><a href="/"  onclick="showPage('instructors'); event.preventDefault();"  class="hover:text-indigo-400 transition duration-300">Instructors</a></li>
        <li><a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-indigo-400 transition duration-300">Contact</a></li>
      </ul>
    </div>

    <!-- Resources -->
    <div>
      <h3 class="text-2xl font-semibold   mb-4">Resources</h3>
      <ul class="space-y-2">
        <li><a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-indigo-400 transition duration-300">FAQs</a></li>
        <li><a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-indigo-400 transition duration-300">Support</a></li>
        <li><a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-indigo-400 transition duration-300">Privacy Policy</a></li>
        <li><a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-indigo-400 transition duration-300">Terms of Service</a></li>
      </ul>
    </div>

    <!-- Newsletter -->
    <div class="">
      <h3 class="text-2xl font-semibold   mb-4">Stay Updated</h3>
      <p class="text-gray-400">Subscribe to our newsletter for exclusive content and offers.</p>
      <form class="mt-4 flex">
        <input type="email" placeholder="Your email"
          class="w-full px-4 py-2 rounded-l-lg bg-gray-300 text-gray-700 border-none focus:ring-indigo-500 outline-none">
        <button class="px-4 py-2 bg-gradient-to-r from-indigo-600  to-purple-600  text-white rounded-r-lg hover:bg-indigo-600 transition duration-300">
          Subscribe
        </button>
      </form>
    </div>
  </div>

  <!-- Divider -->
  <div class="relative  mt-4 pt-6 text-center ">
    <p>&copy; 2025 YourWebsite. All rights reserved.</p>
    <div class="flex justify-center space-x-6 mt-4">
      <a href="https://www.facebook.com/anmamun0" target="_blank" class="text-gray-700 hover:text-indigo-500 transition duration-300"><i class="fab fa-facebook text-lg"></i></a>
      <a href="https://www.facebook.com/anmamun0" target="_blank" class="text-gray-700 hover:text-indigo-500 transition duration-300"><i class="fab fa-twitter text-lg"></i></a>
      <a href="https://anmamun0.vercel.app/" target="_blank" class="text-gray-700 hover:text-indigo-500 transition duration-300"><i class="fab fa-instagram text-lg"></i></a>
      <a href="https://www.facebook.com/anmamun0" target="_blank" class="text-gray-700 hover:text-indigo-500 transition duration-300"><i class="fab fa-linkedin text-lg"></i></a>
    </div>
  </div>
</div>

`;