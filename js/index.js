var empName=document.getElementById('empName')
var empEmail=document.getElementById('empEmail')
var empAddress=document.getElementById('empAddress')
var empphone=document.getElementById('empphone')
var addbtn=document.getElementById('addbtn')
var updatebtn=document.getElementById('updatebtn')
var editbtn=document.getElementById('editbtn')
var embId
var deleteAllBtn=document.getElementById('deleteAllBtn')
var warnEmpty=document.getElementById('warnEmpty')
var empList=[]


var nameRegex =/^[A-Za-z ]{3,30}$/
var emailRegex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var addressRegex=/[A-Za-z,]{3,50}/
var phoneRegex=/01[0125][0-9]{8}/
document.getElementById("nameerror").style.display="none"
document.getElementById("emailerror").style.display="none"
document.getElementById("addresserror").style.display="none"
 document.getElementById("phoneerror").style.display="none"


warnEmpty.style.display="none"
updatebtn.style.display="none"

document.getElementById("addNew").addEventListener("click",function( ){
  updatebtn.style.display="none"
  addbtn.style.display="block"
})


var  myModal = new bootstrap.Modal(document.getElementById('exampleModal'))


addbtn.addEventListener("click",function(){
    addEmployee() 
})

updatebtn.addEventListener("click",function(){
  updateinfo()
})

deleteAllBtn.addEventListener("click",function(){
    deleteall()
   })


if(localStorage.getItem("employeelist") !=null){
  empList=JSON.parse(localStorage.getItem("employeelist"))
  display(empList)
}


function addEmployee (){
  if ( checkNotEmpty()==true){
    if(checkName()==true && checkemail()==true && checkaddress()==true && checkphone()==true){
       var emp ={
      name: empName.value,
      email: empEmail.value,
      address: empAddress.value,
      phone: empphone.value  
      }

  empList.push(emp)
  // console.log(empList);
  display(empList)
  localStorage.setItem("employeelist",JSON.stringify(empList))
  myModal.hide()
  empty()
    }
   
  }
  else{
    checkNotEmpty()
  }
}

function display(list){
// console.log(list);
var cartona=''
for(var i = 0 ; i<list.length ; i++){
    cartona+=`  <tr>
                     <td>${list[i].name}</td>
                     <td>${list[i].email}</td>
                     <td>${list[i].address}</td>
                     <td>${list[i].phone}</td>
                     <td>
                      <button class="btn" id="editbtn" onclick="updatefn(${i})">
                        <i class="fa-solid fa-pen fs-5 text-warning "></i>
                      </button>

                      <button onclick="deletebtn(${i})" class="btn ">
                        <i class="fa-solid fa-trash-can fs-5 text-danger"></i>
                      </button>
                     </td>
                    </tr>   `
}
   document.getElementById("tbody").innerHTML=cartona

}

function empty(){
    empName.value=''
    empEmail.value=''
    empAddress.value=''
    empphone.value=''
}

function deletebtn(id){
  empList.splice(id,1)
  display(empList)
  localStorage.setItem("employeelist",JSON.stringify(empList))
}

function  deleteall(){
  empList=[]
  display(empList)
  localStorage.setItem("employeelist",JSON.stringify(empList))
}

function updatefn(id){
  embId=id
  myModal.show()
  updatebtn.style.display="block"
  addbtn.style.display="none"

  empName.value=empList[id].name
  empEmail.value=empList[id].email
  empAddress.value=empList[id].address
  empphone.value=empList[id].phone
}


function updateinfo(){
  empList[embId]={
    name:empName.value,
    email:empEmail.value,
    address:empAddress.value,
    phone:empphone.value,
  }
  display(empList)
  localStorage.setItem("employeelist",JSON.stringify(empList))
myModal.hide()
empty()
}



              
function checkNotEmpty(){
  if(empName.value =="" || empEmail.value=="" || empAddress.value =="" || empphone.value==""){
   warnEmpty.style.display="block"
      return false
  }

  else{
    warnEmpty.style.display="none"
      return true
     
  }
}    


function checkName(){
  if(nameRegex.test(empName.value)==true){
return true
  }
  else {
    document.getElementById("nameerror").style.display="block"
    return false}
}


function checkemail(){
  if(emailRegex.test(empEmail.value)==true){
return true
  }
  else {
    document.getElementById("emailerror").style.display="block"
    return false}
}

function checkaddress(){
  if(addressRegex.test(empAddress.value)==true){
return true
  }
  else {
    document.getElementById("addresserror").style.display="block"
    return false}
}


 function checkphone(){
   if(phoneRegex.test(empphone.value)==true){
 return true
  }
  else {
    document.getElementById("phoneerror ").style.display="block"
    
    return false}
}