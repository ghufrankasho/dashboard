
let warehouse_id = null;
let token1 = null;
function getBaseURL() {
  return window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000/api"  // Local environment
    : "https://pharmacyabeer.shop/backend/public/api"; // Live environment
}
var baseURL = getBaseURL();
document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('nameInput');
  const classInput = document.getElementById('classInput');

  nameInput.addEventListener('input', validateName);
  classInput.addEventListener('input', validateClass);
  let token = localStorage.getItem('token');
  let admin = JSON.parse(localStorage.getItem('Admin'));
  warehouse_id = parseInt(admin.id);
  console.log(typeof (admin.id))
  token1 = String(token);

});

function validateName() {
  const nameInput = document.getElementById('nameInput');
  const nameError = document.getElementById('nameError');
  const value = nameInput.value.trim();

  if (!value) {
    nameInput.classList.add('error');
    nameError.textContent = 'اسم الداوء مطلوب';
  } else if (value.length > 100) {
    nameInput.classList.add('error');
    nameError.textContent = 'اسم الداوء لا يجب أن يتجاوز 100 أحرف';
  } else {
    nameInput.classList.remove('error');
    nameError.textContent = '';
  }
}
function validateClass() {
  const nameInput = document.getElementById('classInput');
  const nameError = document.getElementById('classError');
  const value = nameInput.value.trim();

  if (!value) {
    nameInput.classList.add('error');
    nameError.textContent = 'اسم الداوء مطلوب';
  } else if (value.length > 200) {
    nameInput.classList.add('error');
    nameError.textContent = 'اسم الداوء لا يجب أن يتجاوز 200 أحرف';
  } else {
    nameInput.classList.remove('error');
    nameError.textContent = '';
  }
}


function addMedicine() {

  let admin = JSON.parse(localStorage.getItem('Admin'));
  warehouse_id = parseInt(admin.id);
  let token = localStorage.getItem('token');
  token1 = String(token);
  const formData = new FormData();
  const select_class = document.getElementById('classifictions');
  const classment = select_class.options[select_class.selectedIndex].text;
  const currentProject = {
    name: document.getElementById('nameInput').value,
    calssification: classment,


  };

  formData.append('name', currentProject.name);
  formData.append('calssification', currentProject.calssification);
  formData.append('warehouse_id', warehouse_id);


  // Check if a new image file has been selected
  const imageInput = document.getElementById('input-file');
  if (imageInput != null && imageInput.files.length > 0) {
    formData.append('photo', imageInput.files[0]);
  }


 console.log(token1);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${baseURL}/warehouse/medicine/add`, true);
  xhr.setRequestHeader("Authorization", "Bearer " + token1);
  xhr.setRequestHeader("Route-Name", "addmedicine");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
        const response = JSON.parse(xhr.responseText);
        console.log('Update success:', response.message);
        showAlert(null, response.message, response.status);
      } else {
        const response = JSON.parse(xhr.responseText);
        showAlert(response.errors, response.message, response.status);
        console.error('Update error:', response.errors || response.message);
      }
    }
  };

  xhr.send(formData);
}


function showAlert(data, message, status) {
  // Show the success message in the "success-message" div
  const Message = document.getElementById('form');
  const div = document.createElement('div');
  console.log(data)
  if (status) {
    div.className = "success alert d-none mt-3 mx-auto"
    div.innerHTML = ` 
    <div class="content-message-alert" id ="AlertMessage">
      <div class="icon">
        <svg width="50" height="50" id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle fill="#fff" cx="64" cy="64" r="64"/></g><g><path fill="#3EBD61" d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"/></g></svg>
      </div>
      
    <p  height="80px";>${message}</p>
    
  
  </div>
  <button class="close"  id="AlertButton">
  <svg height="18px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
  </button>
  `
  }
  if (!status) {
    div.className = "warning alert d-none mt-3 mx-auto"
    div.innerHTML = ` 
    
    <div class="content-message-alert" id ="AlertMessage">
      <div class="icon">
        <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z"/></svg>
    </div>
       
    <p height="100px"> ${message} </p>
    <p height="100px"> ${JSON.stringify(data)} </p>
   
    </div>
    <button class="close" id="AlertButton">
     <svg height="18px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
    </button>
  </div>
  
  `
  }
  if (status == null) {
    div.className = "danger alert d-none mt-3 mx-auto"
    div.innerHTML = ` 
    
    <div class="content-message-alert" id ="AlertMessage">
      <div class="icon">
      <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z"/></svg>
      </div>
      <p height="100px"> ${message} </p>
      </div>
      <button class="close" id="AlertButton">
       <svg height="18px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
      </button>
  </div>
  
  `
  }
  Message.appendChild(div);
  div.classList.remove('d-none');
  const alertButton = document.getElementById('AlertButton');
  alertButton.addEventListener('click', () => {
    // Get the message container


    // Remove the message container from the DOM
    div.remove();
    if (status) window.location.href = `/medicine/proj.html`;
  });
}