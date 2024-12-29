
let Admin=null;
let token1=null;
// function displayProjects() {
//     const xhr = new XMLHttpRequest();
//     const url = `http://127.0.0.1:8000/api/warehouse/home?id=${Admin.id}`;
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             if (xhr.status === 200) {
//                 const projects = JSON.parse(xhr.responseText);
//           //       const projectContainer = document.getElementById('projects');
                
//           //       // Clear existing projects
//           //       projectContainer.innerHTML = '';
                
//           //       projects.forEach(function(project) {
                  
//           //           const projectli = document.createElement('li');
                   
//           //           if(project.prograss>=50)
//           //          {
//           //           projectli.className = 'completed';
//           //          }
//           //          else{
//           //           projectli.className = 'not-completed';
//           //          }
//           //           projectli.innerHTML = `
//           //              <a id="${project.id}"><p> ${project.name}</p></a>
					
//           //               <a>   <i class='bx bxs-heart' id='support-${project.id}'></i>  </a>
//           //               <a><i class='fas fa-user-alt'  id='volunter-${project.id}'></i> </a>
//           //               </li>
//           //             `;
                 
//           //           projectContainer.appendChild(projectli);
//           //           if(project.doners.length ===0){
//           //               document.getElementById(`support-${project.id}`).className=`fas fa-heart-broken`;
                        
//           //        }
//           //       if(project.user.length ===0){
//           //         document.getElementById(`volunter-${project.id}`).className=`fas fa-user-alt-slash`;
                  
//           //       }
//           //   // Create a project button and add an event listener
//           //   const btnproject = document.getElementById(`${project.id}`);
                
        
//           //   btnproject.addEventListener('click',  () => {
//           //     localStorage.setItem('id',project.id);
//           //     window.location.href =`/project/projDesc.html`;
      
//           //   });
//           //     // Create a update button and add an event listener
//           //     const supportButton = document.getElementById(`support-${project.id}`);
                
        
//           //     supportButton.addEventListener('click',  () => {
//           //     if(supportButton.className !=`fas fa-heart-broken`)
//           //     {  
//           //       localStorage.setItem("doners", JSON.stringify(project.doners));
                
                 
//           //       window.location.href =`/support/support.html`;
//           //     }
//           //     else{
//           //       localStorage.setItem("id", project.id);
//           //       localStorage.setItem("name", project.name);
//           //       localStorage.setItem("description", project.description);
//           //       localStorage.setItem("image", project.image);
//           //       window.location.href =`/project/assignSupport.html`;
//           //     }
        
//           //     });
//           //      // Create a update button and add an event listener
//           //     const volunterButton = document.getElementById(`volunter-${project.id}`);
                
//           //     volunterButton.addEventListener('click',  () => {
//           //     if(volunterButton.className !=`fas fa-user-alt-slash`)
//           //      { 
//           //       localStorage.setItem("users", JSON.stringify(project.user));
//           //       localStorage.setItem("employees", JSON.stringify(project.employees));
                  
              
                    
//           //        window.location.href =`/home/usersProject.html`;
//           //       }
//           //     else{
            
                   
//           //         localStorage.setItem("name", project.name);
//           //         localStorage.setItem("description", project.description);
//           //         localStorage.setItem("image", project.image);
//           //         window.location.href =`/project/assignSupport.html?projectId=${project.id}`;
                
//           //       }
         
//           //      });
                
//           // });
//             } else {
//                 console.error('Error fetching projects:', xhr.statusText);
//             }
//         }
//     };
//     xhr.send();
//     xhr.setRequestHeader("Route-Name", "home");
// }

function displayrequest() {
    const xhr = new XMLHttpRequest();
    
    const request_num=document.getElementById('request_num');
    
    const total_num=document.getElementById('total_num');
    const medicine_num=document.getElementById('medicine_num');
    
    const url = `http://127.0.0.1:8000/api/warehouse/home?id=${Admin.id}`;
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Authorization", "Bearer " + token1);
    xhr.onreadystatechange = function () {
    
        if (xhr.readyState === 4) {
       
            if (xhr.status === 200) {
               
                const request = JSON.parse(xhr.responseText);
               
                request_num.textContent=request.data.waited_orders_number;
                medicine_num.textContent=request.data.medicine_num;
                total_num.textContent= request.data.count_total_order;
                const requestContainer = document.getElementById('requests');
                const medicineContainer = document.getElementById('medicines');
                // Clear existing request
                requestContainer.innerHTML = '';
                medicineContainer.innerHTML = '';
                if(request.data.waited_orders.length!==0){request.data.waited_orders.forEach(function(request) {
            
                    const requesttr = document.createElement('tr');
                   
                   requesttr.className='tra';
                   requesttr.id='tra';
                    requesttr.innerHTML = `
                        <td>
                        <a href="/prof.html"> <img src="${request.logo}" ></a>
                        <p id='name-${request.id}'></p>
                        </td>
                        <td>${request.name}</td>
                         <td>${request.email}</td>
                        </tr>
                      `;
                      
                    
                      requestContainer.appendChild(requesttr);
                      
                    
                });}
                if(request.data.medicines_data.length!==0){request.data.medicines_data.forEach(function(request) {
            
                  const requesttr = document.createElement('tr');
                 
                 requesttr.className='tra';
                 requesttr.id='tra';
                  requesttr.innerHTML = `
                      <td>
                      <a href="#"> <img src="${request.photo}" ></a>
                      <p id='name-${request.id}'></p>
                      </td>
                      <td>${request.name}</td>
                       <td>${request.calssification}</td>
                      </tr>
                    `;
                    
                  
                    medicineContainer.appendChild(requesttr);
                    
                  
              });}
                
        
            }
        }
   
  };
  xhr.send();
  xhr.setRequestHeader("Route-Name", "home");
 

}
  window.addEventListener('load', () => {

    let token=localStorage.getItem('token');
    let admin=JSON.parse(localStorage.getItem('Admin'));
    Admin=admin;
    token1=String(token);
    console.log("fffffffffff",token1);
    // displayProjects();
    
     displayrequest();
  
  });
  
  