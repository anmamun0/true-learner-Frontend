const footer = document.querySelector('footer')
footer.innerHTML = `
<!-- Footer Section -->
<div class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-16 px-6">
  <div class="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg"></div>
  
  <div class="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    
    <!-- About Us -->
    <div>
      <h3 class="text-2xl font-semibold text-white mb-4">About Us</h3>
      <p class="text-gray-400 leading-relaxed">
        Unlock your potential with our top-quality online courses. Learn, grow, and achieve your dreams today.
      </p>
    </div>

    <!-- Quick Links -->
    <div>
      <h3 class="text-2xl font-semibold text-white mb-4">Quick Links</h3>
      <ul class="space-y-3">
        <li><a href="/"  onclick="showPage('index_page'); event.preventDefault();"  class="hover:text-blue-400 transition duration-300">Home</a></li>
        <li><a href="/"  onclick="showPage('courses_page'); event.preventDefault();"  class="hover:text-blue-400 transition duration-300">Courses</a></li>
        <li><a href="/"  onclick="showPage('instructors'); event.preventDefault();"  class="hover:text-blue-400 transition duration-300">Instructors</a></li>
        <li><a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-blue-400 transition duration-300">Contact</a></li>
      </ul>
    </div>

    <!-- Resources -->
    <div>
      <h3 class="text-2xl font-semibold text-white mb-4">Resources</h3>
      <ul class="space-y-3">
        <li><a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-blue-400 transition duration-300">FAQs</a></li>
        <li><a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-blue-400 transition duration-300">Support</a></li>
        <li><a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-blue-400 transition duration-300">Privacy Policy</a></li>
        <li><a href="/"  onclick="showPage('support'); event.preventDefault();"  class="hover:text-blue-400 transition duration-300">Terms of Service</a></li>
      </ul>
    </div>

    <!-- Newsletter -->
    <div>
      <h3 class="text-2xl font-semibold text-white mb-4">Stay Updated</h3>
      <p class="text-gray-400">Subscribe to our newsletter for exclusive content and offers.</p>
      <form class="mt-4 flex">
        <input type="email" placeholder="Your email"
          class="w-full px-4 py-2 rounded-l-lg bg-gray-700 text-gray-300 border-none focus:ring-blue-500 outline-none">
        <button class="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300">
          Subscribe
        </button>
      </form>
    </div>

  </div>

  <!-- Divider -->
  <div class="relative border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
    <p>&copy; 2025 YourWebsite. All rights reserved.</p>
    <div class="flex justify-center space-x-6 mt-4">
      <a href="https://www.facebook.com/anmamun0" target="_blank" class="text-gray-400 hover:text-blue-400 transition duration-300"><i class="fab fa-facebook text-xl"></i></a>
      <a href="https://www.facebook.com/anmamun0" target="_blank" class="text-gray-400 hover:text-blue-400 transition duration-300"><i class="fab fa-twitter text-xl"></i></a>
      <a href="https://anmamun0.vercel.app/" target="_blank" class="text-gray-400 hover:text-blue-400 transition duration-300"><i class="fab fa-instagram text-xl"></i></a>
      <a href="https://www.facebook.com/anmamun0" target="_blank" class="text-gray-400 hover:text-blue-400 transition duration-300"><i class="fab fa-linkedin text-xl"></i></a>
    </div>
  </div>
</div>

`;