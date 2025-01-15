
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
    
    const request_num=document.getElementById('request_num');
    
    const total_num=document.getElementById('total_num');
    const medicine_num=document.getElementById('medicine_num');
    
    const url = `${baseURL}/warehouse/home`;
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
                          <img src="${request.pharmacy.logo}" >
                      
                        </td>
                        <td>  <a href="medicine/projDesc.html?projectId=${request.medicine.id}"> <img src="${request.medicine.photo}" ></a>
                      </td>

                        <td>${request.quantity}</td>
                       
                        <td><span class="status pending "  id="avalible-${request.id}">wait</span></td> 
                         
                        
                        </tr>
                      `;
                      
                    
                      requestContainer.appendChild(requesttr);
                      const span = document.getElementById(`avalible-${request.id}`);
                    
                      if(request.confirmed=="done")
                        {
                          span.className='status completed';
                          span.textContent=request.confirmed;
                         
                          
                        }

                        else{
                          span.className='status not-completed' ;
                           
                          
                        }
                      
                    
                });}
                if(request.data.medicines_data.length!==0){request.data.medicines_data.forEach(function(request) {
            
                  const requesttr = document.createElement('tr');
                 
                 requesttr.className='tra';
                 requesttr.id='tra';
                  requesttr.innerHTML = `
                      <td>
                      <a href="medicine/projDesc.html?projectId=${request.id}"> <img src="${request.photo}" ></a>
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
   
    token1=String(token);
 
    
     displayrequest();
  
  });
  
  