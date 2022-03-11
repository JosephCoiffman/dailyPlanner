var taskList = [];
var window;


function createPopUp(windowToOpen = 'add-task.html'){
    window = window.open(windowToOpen,'popup','width=600,height=600');
    return window;
    
}


function closePopUp(taskWindow){
    taskWindow.close();
    return false
}

function areYouSure(action){
    
    if(action == "Start Over"){
        if(confirm("Are you sure you want to " + action + "? This cannot be undone!")){
            localStorage.clear();
        }
    }else{
        if(confirm("Are you sure you want to " + action + "? You cannot edit your entry once you submit!")){
            createTask();   
            closePopUp(createPopUp());
        }
    }
}

function createTask(){
    var name = document.getElementById("tn").value;  
    var lenght = document.getElementById("length").value;
    var time = document.getElementById("time").value;
    
    
    var newRow = document.createElement("tr");
    var task = document.createElement("th"); 
    task.colSpan = (parseInt(lenght) / 15);
    task.innerText = name; 
    //add onclick
    var startTime = (parseInt(time.slice(0, 2) * 60) + parseInt(time.slice(3, 5))) / 15;
    var filler = document.createElement("th");
    filler.colSpan = startTime;
    filler.id = "noBorder";
    newRow.appendChild(filler);
    newRow.appendChild(task);
    taskList.push(newRow);
    if(localStorage.getItem('key')){
        var key = localStorage.getItem('key');
        localStorage.setItem('key', parseInt(key) + 1);
    }else{
    localStorage.setItem('key', 0);
    }
    var key = localStorage.getItem('key');
    localStorage.setItem(key, newRow.innerHTML);
    console.log(key)
    console.log(localStorage.getItem(key));
    //console.log(localStorage.getItem(key - 1));

    
}

function CreateTable(){
    var row = document.getElementById("row");
    for(var x = 0; x < 96; x++){
        var column = document.createElement("td");
        row.appendChild(column);

    }
}

var lenOfTask = {
    "Journal Entry": "15",
    "Sleep": "480",
    "Eat": "30",
    "Meeting": "60"
};

function ViewForm(st) {
    document.getElementById('hidden').removeAttribute('hidden');
    if(st == "prefill"){
        var prefillied = document.getElementById("common-tasks");
        var name = document.getElementById("tn");
        var lenght = document.getElementById("length");
        name.value = prefillied.value;
        lenght.value = lenOfTask[name.value];
    }
}

var isTLoaded = document.getElementById("row");
if(isTLoaded){
    CreateTable();
    for(let x = 0; x < localStorage.getItem('key'); x++){
        var newRow = document.createElement("tr");
        newRow.innerHTML = localStorage.getItem(x);
        document.getElementById("table").appendChild(newRow);
    }
}