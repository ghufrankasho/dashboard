
function getBaseURL() {
  return window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000/api"  // Local environment
      : "https://pharmacyabeer.shop/backend/public/api"; // Live environment
}
 
var baseURL = getBaseURL();
 
// Function to handle form submission and AJAX request
function submitSignUpForm(event) {
     event.preventDefault(); // Prevent default form submission

    // Get form data
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var password_confirmation = document.getElementById('password_confirmation').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var name = document.getElementById('name').value;
    
    
    // Now you have the data from the signup form, you can use it as needed

 
    var formData = {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        type:"warehouse",
        phone:phone,
        address:address,
        name:name
     

      };
    // Add your AJAX request here
   
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `${baseURL}/auth/register`, true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // Set the content type to JSON
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            // Handle successful response
            var response = JSON.parse(xhr.responseText);
         
             
          
            localStorage.setItem('Admin', JSON.stringify(response.user));
         
            localStorage.setItem('token', response.token);
      
          
             window.location.href =`/home.html`;
            
           
              
        } 
        else {
          
          if((xhr.readyState === 4 && xhr.status === 400) )
                  {var response = JSON.parse(xhr.responseText);
  
                  // Handle errors or other states
                  d=JSON.stringify(response.errors);
                  
                  showSuccessAlert(response.errors, '',false,`signUpForm`);
              }
          else{ 
            showSuccessAlert('Error occurred during login .',response,null);
          }
        }
    };
    xhr.send(JSON.stringify(formData)); // Send the form data as JSON

}
function submitSignInForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    var email = document.getElementById('singinemail').value;
    var password = document.getElementById('singinpassword').value;
    
   

    var formData = {
        email: email,
        password: password,
        type:"warehouse"
       
       
      };
   

    var xhr = new XMLHttpRequest();
   
    xhr.open('POST', `${baseURL}/auth/login`, true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // Set the content type to JSON
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle successful response

            var response =  JSON.parse(xhr.responseText);
            
          localStorage.setItem('Admin', JSON.stringify(response.user));
         
          localStorage.setItem('token', response.token);
    
          
        window.location.href =`/home.html`;
         
        }
        else {
            if((xhr.readyState === 4 && xhr.status === 400 ) )
                {
                  var response = JSON.parse(xhr.responseText);

                console.log(response)
                 showSuccessAlert(response.message,'',response.status,`signInForm`);
             
} 
        }
    };
    xhr.send(JSON.stringify(formData)); // Send the form data as JSON
}
function resetPassword() {
   
  // Get form data
  var new_password = document.getElementById('new_password').value;
  var old_password = document.getElementById('old_password').value;
  var password_confirmation = document.getElementById('confirmed_password').value;
 
   
  let token1 = localStorage.getItem('token');
 
  var formData = new FormData();
  formData.append('new_password',new_password);
  formData.append('old_password',old_password);
  formData.append('new_password_confirmation',password_confirmation);
  console.log(formData);
 var x=1;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `${baseURL}/auth/reset_password`, true);
  xhr.setRequestHeader("Authorization", "Bearer " + token1);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // Handle successful response

          var response = JSON.parse(xhr.responseText);
          x+=1;
          showSuccessAlert(null,response.message,true,'reset-password');
          
        }
      else {
        if ( (xhr.status === 400 || xhr.status === 404) && x===1)
            { var response = JSON.parse(xhr.responseText);
              console.log(response,x);
              x+=1;
              // Handle errors or other states
              showSuccessAlert(response.errors,'',false,`reset-password`);
            }
           
}  
  };
 
  xhr.send(formData); 
}
function logout(){
  let token=localStorage.getItem('token');
  
  token1=String(token);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `${baseURL}/auth/logout`, true);
  xhr.setRequestHeader("Authorization", "Bearer " + token1);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // Handle successful response
          var response = JSON.parse(xhr.responseText);
       
           
        
           
        
           window.location.href =`/index.html`;
          
         
            
      } 
      else {
        
        if((xhr.readyState === 4 && xhr.status === 400) )
                {var response = JSON.parse(xhr.responseText);

                // Handle errors or other states
                d=JSON.stringify(response.errors);
                
                 console.log(d);
            }
        else{ 
          showSuccessAlert('Error occurred during login .',response,null);
        }
      }
  };
}
function showSuccessAlert(data, message, status,form) {
    // Show the success message in the "success-message" div
    const Message = document.getElementById(form);
 
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
      if(data=="user type  is not correct chose the right  type for this account"){
        window.location.href =`tochoose.html`;
      }
  
      // Remove the message container from the DOM
      div.remove();
      if(status) window.location.href =`/index.html`;
    });
}
document.addEventListener('DOMContentLoaded', function () {
  const resetButton = document.getElementById('reset-btn');
  resetButton.onclick = function(){
      resetPassword();
      }
});
 
