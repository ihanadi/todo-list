const form = document.querySelector("#project-form");
const addPro = document.querySelector("#addProject");
const filterInput = document.querySelector("#filter");
const proList = document.querySelector("ul.collection");
const clearBtn = document.querySelector(".clear-projects");

loadEventListener()

function loadEventListener(){
    // Local Storage Event
    document.addEventListener("DOMContentLoaded", getProjects);
    // Add New Project Eventc
    form.addEventListener("submit",addProject);
    // Remove Project 
    proList.addEventListener("click",removeProject);
    // Clear All Projects 
    clearBtn.addEventListener("click",clearProjects);
    // Filter Projects
    filterInput.addEventListener("keyup",filterProjects)
}
//add from local storage to web page
function getProjects(){
    let projects;
    if (localStorage.getItem('projects') === null) {
        projects = [];
    }else{
        projects = JSON.parse(localStorage.getItem('projects'))
    }
    projects.forEach(function(projectName){
        const li = document.createElement("li");
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(projectName));
    
        // Creat a delete icon
        const link = document.createElement("a");
        link.className = 'delete-item secondary-content';
        link.innerHTML = "<i class='far fa-trash-alt'></i>"
        li.appendChild(link);
        proList.appendChild(li)
    })
}


// Filter Projects
function filterProjects(e){
    const filterText = e.target.value.toLowerCase(); // toLowerCase() to change all letters input to lower case 
    document.querySelectorAll(".collection-item").forEach(function(projects){
        const itemText = projects.firstChild.textContent.toLowerCase(); // toLowerCase() to do all list words to lower case
        if(itemText.indexOf(filterText) != -1){
            projects.style.display = 'block';
        }else{
            projects.style.display = 'none';
        }
    })
}

// Clear All Projects
function clearProjects(){
    // proList.innerHTML = ""
    while(proList.firstChild){
        proList.removeChild(proList.firstChild);
    }
    // clear from local storage function
    clearProjectsFromeLocalStorage();
}
// Clear All Projects From Local Storage
function clearProjectsFromeLocalStorage(){
    localStorage.clear()
}

// Remove Project 
function removeProject(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        e.target.parentElement.parentElement.remove()
    }
    removeProjectFromLocaleStorage(e.target.parentElement.parentElement)
}
// Remove Project From Local Storage 
function removeProjectFromLocaleStorage(projectItem){
    let projects;
    if (localStorage.getItem('projects') === null) {
        projects = [];
    }else{
        projects = JSON.parse(localStorage.getItem('projects'))
    }
    projects.forEach(function(projectName,index){
        if(projectItem.textContent === projectName){
            projects.splice(index,1);
        }
    })
    localStorage.setItem('projects',JSON.stringify(projects))
}

// Add New Project
function addProject(e){
    if (addPro.value === ""){
        alert("Add new project")
    }else{
        // Creat li Element
        const li = document.createElement("li");
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(addPro.value));
    
        // Creat a delete icon
        const link = document.createElement("a");
        link.className = 'delete-item secondary-content';
        link.innerHTML = "<i class='far fa-trash-alt'></i>"
        li.appendChild(link);
        proList.appendChild(li)
    
        storeProjectsInLocalStorage(addPro.value);
        addPro.value = "";
    }


    e.preventDefault();
}

function storeProjectsInLocalStorage(projectName){
    let projects;
    if (localStorage.getItem('projects') === null) {
        projects = [];
    }else{
        projects = JSON.parse(localStorage.getItem('projects'))
    }
    projects.push(projectName);
    localStorage.setItem('projects', JSON.stringify(projects))

}