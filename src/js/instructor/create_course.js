// + create Couse


// Initialize Quill.js editor
var quill = new Quill('#course_create_editor', {
  theme: 'snow',
  placeholder: "Write the course description here...",
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean'] // Remove formatting button
    ]
  }
}); 

// Add another video input group
document.getElementById("add-video").addEventListener("click", function () {
  const container = document.getElementById("video-container");
  const videoGroup = document.createElement("div");
  videoGroup.className = "flex items-center space-x-4 mt-4";
  videoGroup.innerHTML = `
                <input type="text" name="video_title[]"
                class="w-1/2 rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-1 focus:ring-slate-400 focus:outline-none"
                placeholder="Video Title" required />

                <input   type="url"  name="video_url[]"
                class="w-1/2 rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-1 focus:ring-slate-400 focus:outline-none"
                placeholder="Video URL" required
                />

                <!-- Video Duration Input -->
                <input type="text" name="video_duration[]" class="w-1/6 rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-1 focus:ring-slate-400 focus:outline-none"
                placeholder="(hh:mm:ss)" required />

                <button type="button"
                class="text-gray-900 px-4 py-2 rounded-lg  hover:scale-105 transition flex items-center space-x-2"
                onclick="removeVideo(this)" >
                <i class="fas fa-trash"></i> </button>
                `;
  container.appendChild(videoGroup);
});

function removeVideo(button) {
  button.parentElement.remove();
}


const showAllCateogry = () => {
  fetch(`https://truelearner-backends.onrender.com/course/category/`)
    .then(res => res.json())
    .then(categorys => {
      const addCategoryFromAPI = document.getElementById('addCategoryFromAPI');
      categorys.forEach(cat => {
        addCategoryFromAPI.innerHTML += `
          <!-- Single Category -->
         <label class="flex items-center justify-between p-4 rounded-lg border border-gray-300 shadow-md bg-white cursor-pointer transition-all peer-checked:bg-blue-100 hover:shadow-lg">
              <input type="checkbox" name="category" value="${cat.id}" class="hidden peer">
          <span class="text-gray-900 font-medium truncate">${cat.name}</span>

          <svg class="w-5 h-5 text-gray-400 hidden peer-checked:block peer-checked:text-blue-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 111.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>

        </label>
      `;
      })
    })
    .catch(e => console.log(e));
}




const createCourse = () => {

  document.getElementById("form_create_course").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    console.log("Form Data:"); 
    const videoTitles = formData.getAll("video_title[]");
    const videoUrls = formData.getAll("video_url[]");
    const video_duration = formData.getAll("video_duration[]");


    const course_data = {
      'token': getToken(),
      "title": formData.get('title'),
      "thumble": '',
      "category": formData.getAll('category').map(value => parseInt(value, 10)),
      "description": document.getElementById("course_create_editor").innerHTML,
      "price": formData.get('price'),
      "total_lecture": formData.get('total_lecture'),
      "total_session": formData.get('total_session'),
      "total_length": formData.get('total_length'),
      'videos': [],
      
    }
    videoTitles.forEach((title, idx) => {
      const video = {
        'title': title,
        'url': videoUrls[idx],
        'duration': video_duration[idx],
      }
      course_data.videos.push(video);
    });

    const file = this.elements["thumbnail"].files[0];
    const courseThumbleForm = new FormData();
    courseThumbleForm.append('image', file);
    
    
    fetch('https://api.imgbb.com/1/upload?key=99af3bf39b56183ca39470aa2ea81b31',
      {
        method: 'POST',
        body: courseThumbleForm,
      }
    )
      .then(res => res.json())
      .then(resData => {
          course_data.thumble = resData.data.display_url; 

        fetch(`https://truelearner-backends.onrender.com/course/courses/create/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(course_data), 
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            pushAlert('success',"Successfully created course")
          })
          .catch(e => console.log(e));
        
      })
      .catch(e => console.log(e));


    console.log('testing', course_data);

  });
}

createCourse();

