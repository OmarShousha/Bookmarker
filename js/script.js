//& ═════════════════▶ Variables ◀════════════════════ 
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");

var searchInput = document.getElementById("searchInput");

var indexUpdate =0;
var websiteList =[];

var alertName = document.getElementById("alertName");
var alertUrl = document.getElementById("alertUrl");

var tableHead = document.getElementById("tableHead");




if( localStorage.getItem("websites") != null ){
  websiteList = JSON.parse(localStorage.getItem("websites"));  //*═══▶ 2=LS
  displayData();
} 

//& ══════════════════▶ Functions ◀═══════════════════════ 
function addSite(){
  
   if(validationName() == true && validationUrl() == true){
    var website ={
      name: siteName.value,
      url: siteUrl.value
    }
  
    websiteList.push(website);
    
    localStorage.setItem("websites" , JSON.stringify(websiteList)); //* ═══▶1-LS
  
    displayData();
    clearForm();
    console.log(websiteList);
    
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");

    alertName.classList.add("d-none");
    alertUrl.classList.add("d-none");

   } 
  
    
}

function displayData(){

  var cartona ="";
  for (var i=0; i<websiteList.length; i++){
    cartona += `
    <tr>
      <td class="align-middle">${i}</td>
      <td class="align-middle">${websiteList[i].name}</td>

      <td class="align-middle">
        <a href="${websiteList[i].url}" target="_blank">
          <button class="btn btn-visit">
            <i class="fa-solid fa-eye d-inline"></i>
            Visit
          </button>
        </a>
      </td>
      
      <td class="align-middle">
        <button onclick="setData(${i})" class="btn btn-update">
        <i class="fa-solid fa-pen-to-square"></i>
          Update
        </button>
      </td>

      <td class="align-middle">
        <a>
          <button onclick="deleteWebsite(${i})" class="btn btn-delete">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </a>
      </td>

    </tr>
    `
  }

  document.getElementById("tableBody").innerHTML= cartona;
}

function deleteWebsite(index){
  websiteList.splice(index,1);
  localStorage.setItem("websites" , JSON.stringify(websiteList)); //*═══▶ 3-LS
  displayData();
}

function clearForm(){
  siteName.value='';
  siteUrl.value='';
}

//? ═══════▶ Update ◀══════════
function setData(index){

  indexUpdate =index;

  siteName.value= websiteList[index].name;
  siteUrl.value= websiteList[index].url;

  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");

}

function updateSite(){
  var website ={
    name: siteName.value,
    url: siteUrl.value
  }

  // del & edit
  websiteList.splice(indexUpdate, 1, website);
  // edit LS
  localStorage.setItem("websites" , JSON.stringify(websiteList));
  // display the new 
  displayData();

  submitBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");

  clearForm();

}


//? ═══════▶ Search ◀═════════

function searchByName(){
  
  var term = searchInput.value;
  var cartona ="";
  for (var i=0; i<websiteList.length; i++){
    if(websiteList[i].name.toLowerCase().includes(term.toLowerCase())){
      cartona += `
    <tr>
      <td class="align-middle">${i}</td>
      <td class="align-middle">${websiteList[i].name}</td>

      <td class="align-middle">
        <a href="${websiteList[i].url}" target="_blank">
          <button class="btn btn-visit">
            <i class="fa-solid fa-eye d-inline"></i>
            Visit
          </button>
        </a>
      </td>
      
      <td class="align-middle">
        <button onclick="setData(${i})" class="btn btn-update">
        <i class="fa-solid fa-pen-to-square"></i>
          Edit
        </button>
      </td>

      <td class="align-middle">
        <a>
          <button onclick="deleteWebsite(${i})" class="btn btn-delete">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </a>
      </td>

    </tr>
    `
    }
  }
  displayData();
  document.getElementById("tableBody").innerHTML= cartona;
}

//* ═════════════════▶ Validation ◀═════════════════════

function validationName(){
  var termName = siteName.value;
  var regexName = /^[a-zA-Z]{2,15}$/;

  if(regexName.test(termName)){

    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    
    alertName.classList.add("d-none");

    return true;

  }else{

    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");

    alertName.classList.remove("d-none")
    return false;

  }

}

function validationUrl(){
  var termUrl = siteUrl.value;
  var regexUrl = /^\bhttps?:\/\/\S+\b$/

  if(regexUrl.test(termUrl)){

    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    alertUrl.classList.add("d-none");
    return true;

  }else{

    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    alertUrl.classList.remove("d-none");
    return false;
  }

}