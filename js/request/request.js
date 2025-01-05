
let Admin=null;
let token1=null;
function getBaseURL() {
  return window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000/api"  // Local environment
      : "https://pharmacyabeer.shop/backend/public/api"; // Live environment
}
var baseURL = getBaseURL();

function displayrequest() {
   
    const xhr = new XMLHttpRequest();
    const url = `${baseURL}/warehouse/medicinePharmacy/orders`;
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Authorization", "Bearer " + token1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const requests = JSON.parse(xhr.responseText);
               
                const requestContainer = document.getElementById('requests-wait');
                const doneContainer = document.getElementById('requests-done');
                const requestnum = document.getElementById('request_num');
                requestnum.textContent=``;
                requestnum.textContent=requests.data.length;
                var dis="none";
                // Clear existing request
                requestContainer.innerHTML =``;
                doneContainer.innerHTML =``;
                requests.data.forEach(function(request) {
                //   localStorage.setItem( `request`+`${request.id}`, request );
                  
                if(request.confirmed==="wait") dis="block";
                  const requesttr = document.createElement('tr');
                    
                   
                   
                  requesttr.innerHTML = ` 
                  <td></td>
                      <td><a href="/medicine/projDesc.html?projectId=${request.medicine.id}">
                    <img src="${request.medicine.photo}"></a>
                     <p>${request.medicine.name}</p></td>
                    <td><img src="${request.pharmacy.logo}"> <p>${request.pharmacy.name}</p></td>
                    <td>   <p>${request.quantity}</p></td>
                  
                    <td>  
    <!-- View Icon -->
    <a href="#">
        <svg xmlns="http://www.w3.org/2000/svg" id="view-${request.id}" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
        </svg>
    </a>

    <!-- Delete Icon -->
    <a href="#" class="delete">
        <svg xmlns="http://www.w3.org/2000/svg" id="delete-${request.id}" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
    </a>

    <!-- Check Icon -->
    <a href="#" class="check" >
        <svg xmlns="http://www.w3.org/2000/svg"  id="check-${request.id}" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            <path d="M10.854 5.646a.5.5 0 0 1 .708.708L7.707 10.207l-2-2a.5.5 0 0 1 .708-.708L8 9.293l2.854-2.854a.5.5 0 0 1 .708 0z"/>
        </svg>
    </a>
</td>
 `;
                  
                
                 if(request.confirmed==="wait"){
                    requestContainer.appendChild(requesttr);
                }
                else {doneContainer.appendChild(requesttr);
                  document.getElementById(`check-${request.id}`).style.display="none";
                }
                
                 const checkButton = document.getElementById(`check-${request.id}`);
                 checkButton.addEventListener('click', function() {
                     if(request.confirmed==="wait")
                     {if(window.confirm("هل متأكد من أنك تريد تأكيد هذا الطلب؟"))
                         {checkrequest(request.id);}}
                    
                   });
                  //// Create a delete button and add an event listener
                const deleteButton = document.getElementById(`delete-${request.id}`);
                deleteButton.addEventListener('click', function() {
                    if(request.confirmed==="wait")
                    {if(window.confirm("هل متأكد من أنك تريد رفض هذا الطلب؟"))
                        {deleterequest(request.id);}}
                    else 
                    {if(window.confirm("هل متأكد من أنك تريد حذف هذا الطلب؟"))
                            {deleterequest(request.id);}}
                  });
                  // Create a view button and add an event listener
                  const viewButton = document.getElementById(`view-${request.id}`);
                  viewButton.addEventListener('click',  () => {
                    localStorage.setItem( `request`+`${request.id}`, JSON.stringify(request) );
                   
                   window.location.href =`viewRequest.html?requestId=${request.id}`;
        
                  });
                   
                });

                const searchButton = document.getElementById(`search`);
                    
                searchButton.addEventListener('click',  () => {
              
                  const search=document.getElementById('search_input').value;
                  console.log(search)
                 searchrequest(search);
                  
                });
              
            } else {
                console.error('Error fetching request:', xhr.statusText);
            }
        }
    };
    xhr.send();
}
function deleterequest(id) {
    
    
    
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${baseURL}/warehouse/medicinePharmacy/?id=${id}`, true);
    xhr.setRequestHeader("Authorization", "Bearer " + token1);
    xhr.onreadystatechange = function () {
       
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                
                const response = JSON.parse(xhr.responseText);
                console.log('Delete success:', response.message);
                displayrequest();
               // showAlert(null,response.message,response.status);
                // displayrequest();
            } else {
                const response = JSON.parse(xhr.responseText);
                showAlert(response.errors ,response.message,response.status);
                console.error('Delete error:', response.errors || response.message);
            }
        }
    };
    xhr.send();
    
}
function checkrequest(id) {
    
    
    
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${baseURL}/warehouse/medicinePharmacy/?id=${id}`, true);
  xhr.setRequestHeader("Authorization", "Bearer " + token1);
  xhr.onreadystatechange = function () {
     
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              
              const response = JSON.parse(xhr.responseText);
            
              displayrequest();
             // showAlert(null,response.message,response.status);
              // displayrequest();
          } else {
              const response = JSON.parse(xhr.responseText);
              showAlert(response.errors ,response.message,response.status);
              //console.error('Delete error:', response.errors || response.message);
          }
      }
  };
  xhr.send();
  
}
function searchrequest(input) {
  
     
    const xhr = new XMLHttpRequest();
    const url = `${baseURL}/warehouse/medicinePharmacy/search?search=${input}`;
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Authorization", "Bearer " + token1);
    xhr.setRequestHeader("Route-Name", "search");
    xhr.onreadystatechange = function () {
       
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                
                const requests = JSON.parse(xhr.responseText);
                   
                // Clear existing request
                document.getElementById('done_request').style.display='none';
                document.getElementById('status1').style.display='block';
                document.getElementById('text-request').textContent='نتيجة البحث';
                document.getElementById('no-result').style.display='none';
         
                const requestContainer = document.getElementById('requests-wait');
                requestContainer.innerHTML =``;
                const requestnum = document.getElementById('request_num');
                requestnum.textContent=``;
                requestnum.textContent=requests.data.length;
                requests.data.forEach(function(request) {
                  
                  
                  const requesttr = document.createElement('tr');
                  
                  requesttr.innerHTML = `  <td></td>
                      <td><a href="/medicine/projDesc.html?projectId=${request.medicine.id}">
                    <img src="${request.medicine.photo}"></a>
                     <p>${request.medicine.name}</p></td>
                    <td><img src="${request.pharmacy.logo}"> <p>${request.pharmacy.name}</p></td>
                    <td>   <p>${request.quantity}</p></td>
                  
                    <td><span class="status pending "  id="avalible-${request.id}"> wait</span></td> 
                      <td>  
                     <a herf="#">
                        <svg xmlns="http://www.w3.org/2000/svg" id="view-${request.id}" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg>
                         </a>
                          <a href="#" class="delete">
                        <svg xmlns="http://www.w3.org/2000/svg" id="delete-${request.id}" width="16" height="16" fill="currentColor" class=" bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                      </svg> </a></td>  `;
                  
                
                 
                requestContainer.appendChild(requesttr);
                const span = document.getElementById(`avalible-${request.id}`);
                if(request.confirmed==="done")
                 {
                    span.className='status completed' ;
                    span.textContent='done';} 
                //// Create a delete button and add an event listener
                const deleteButton = document.getElementById(`delete-${request.id}`);
                deleteButton.addEventListener('click', function() {
                    if(request.confirmed==="wait")
                    {  if(window.confirm("هل متأكد من أنك تريد رفض هذا الطلب؟"))
                        {deleterequest(request.id);}}
                    if(window.confirm("هل متأكد من أنك تريد حذف هذا الطلب؟"))
                            {deleterequest(request.id);}
                });
                // Create a view button and add an event listener
                const viewButton = document.getElementById(`view-${request.id}`);
                viewButton.addEventListener('click',  () => {
                    localStorage.setItem( `request`+`${request.id}`, JSON.stringify(request) );
                
                window.location.href =`viewRequest.html?requestId=${request.id}`;

                });
                            
                
                 
                  
                });
            } else {
              if (xhr.status === 204) {
                // show no result message
                       
         
          
         // Clear existing request
         document.getElementById('done_request').style.display='none';
         document.getElementById('status1').style.display='block';
         document.getElementById('text-request').textContent='نتيجة البحث';
         document.getElementById('no-result').style.display='block';
         
         const requestContainer = document.getElementById('requests-wait');
         requestContainer.innerHTML =``;
         const requestnum = document.getElementById('request_num');
         requestnum.textContent=``;
         requestnum.textContent="0";
         
         
         
              }
            }
        }
    };
    xhr.send();
    
  }
function showAlert(data, message, status) {
    // Show the success message in the "success-message" div
    const Message = document.getElementById('done_request');
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
    });
}

 
window.addEventListener('load', () => {

    let token=localStorage.getItem('token');
    let admin=JSON.parse(localStorage.getItem('Admin'));
    Admin=admin;
    token1=String(token);
    // console.log("fffffffffff",token1);
    // displayProjects();
    
    displayrequest();
  
  });
