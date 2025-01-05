
let warehouse_id=null;
let token1=null;
let medicine_id=0;
function getBaseURL() {
  return window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000/api"  // Local environment
      : "https://pharmacyabeer.shop/backend/public/api"; // Live environment
}
var baseURL = getBaseURL();
function viewProject(medicine_id) {
     

    const xhr = new XMLHttpRequest();
    const url = `${baseURL}/warehouse/medicine?id=${medicine_id}`;
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Authorization", "Bearer " + token1)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    document.getElementById('image').src = response.data.photo;
                     
                    document.getElementById('name').textContent = response.data.name;
                    document.getElementById('classification').textContent = response.data.calssification;
                     
                    const btnproject = document.getElementById(`add-medDetials`);
                
        
                    btnproject.addEventListener('click',  () => {
                    
                    localStorage.setItem('medicine_id',response.data.id);
                    window.location.href =`/medicine/addDetails.html?projectId=${response.data.id}`;
              
                    });
                   
                      
                      // showing medDetials of the project
                      const supportClass=document.getElementById('medDetials');
                       
                      if(response.data.medicinedetials !=null ){
                        
                  
                              const donertdiv = document.createElement('div');
                              donertdiv.className='card2  col-lg-5 mb-5';
                              donertdiv.style="max-width: 540px; margin-left: auto; margin-right: auto;";
                              donertdiv.innerHTML = `
                                  <div class="row g-0">
                                   
                                  <div class="col-md-8">
                                  <div class="card-body">
                                  <h5 class="card-title">مكونات الدواء </h5>
                                  <p>${response.data.medicinedetials.component}</p>
                                  <h5 class="card-title">  سعر الدواء</h5>
                                  <p class="card-text">${response.data.medicinedetials.price}</p>
                                  <h5 class="card-title">  كمية الدواء</h5>
                                  <p class="card-text">${response.data.medicinedetials.quantity}</p>
                                 <h5 class="card-title">  تاريخ نهاية الصلاحية</h5>
                                  <p class="card-text">${response.data.medicinedetials.expire_date}</p>
                                 
                                   
                                  </div>
                                  
                              </div>
                       <div class="button-group">
                                            <button class="button-48" role="button" id="update"><span class="text">تعديل</span></button>
                                            <button class="button-48" role="button" id="delete"><span class="text">حذف</span></button>
                        </div>
                              </div>
                               `;
                              supportClass.appendChild(donertdiv); 
                              const deleteButton = document.getElementById(`delete`);
                  deleteButton.addEventListener('click', function() {
                      
                      if(window.confirm("هل متأكد من أنك تريد حذف  تفاصيل هذا الدواء؟"))
                        {deleteMedDetail(response.data.medicinedetials.id);}
                  });
                  // Create a update button and add an event listener
                  const updateButton = document.getElementById(`update`);
                  

                  updateButton.addEventListener('click',  () => {
                
                    const projectId = response.data.medicinedetials.id;
                     
                    // console.log(projectId)
                   window.location.href =`updateDetails.html?projectId=${projectId}`;
                    
                  });
                             
                      }
                       else{
                        document.getElementById("addmed").style.display = "block"
                        document.getElementById("addmed").style.display = "block"}
                     
                  
                   
                } catch (e) {
                    console.error("Failed to parse response JSON:", e);
                }
            } else {
                console.error("Error with request, status code:", xhr.status);
            }
        }
    };
  
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}
 
function deleteMedDetail(id) {

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${baseURL}/warehouse/medicineDetials/${id}`, true);
    xhr.setRequestHeader("Authorization", "Bearer " + token1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log('Delete success:', response.message);
                 document.getElementById("medDetials").style.display = "none";
                 document.getElementById("addmed").style.display = "block";
                // showAlert(null,response.message,response.status);
            } else {
                // const response = JSON.parse(xhr.responseText);
                 showAlert(response.errors ,response.message,response.status);
                // console.error('Delete error:', response.errors || response.message);
            }
        }
    };
    xhr.send();
  }
function showAlert(data, message, status) {
    // Show the success message in the "success-message" div
    const Message = document.getElementById('projDesc');
    const div = document.createElement('div');
    
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
    });
  }
  // Call the displayProject function when the page loads
window.addEventListener('load', () => {
    // Get the project ID from the query parameters (e.g., "?projectId=20")
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('projectId');
    medicine_id=projectId
    let token=localStorage.getItem('token');
    let admin=JSON.parse(localStorage.getItem('Admin'));
    warehouse_id=admin.id;
    token1=String(token);
    // Call the function with the retrieved project ID
    if (projectId) {
        viewProject(medicine_id);
    } 
        else{console.error("No projectId found in URL parameters.");}
    
  });