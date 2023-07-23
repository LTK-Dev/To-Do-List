// Cac Bien check input
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add element and a delete icon
function addTask() {
    // .value la truy cap toi attribute cua input
    if (inputBox.value === "") {
        // Khong input thi end frunction
        return;
    }
    else { 
        // Gan input vao li
        let li = document.createElement("li");
        let input = document.createElement("input");
        //input.value = inputBox.value;
        input.setAttribute("value", inputBox.value);
        input.readOnly = true;
        input.className = "none";
        input.maxLength = 37;
        li.appendChild(input);

        // Set drag to li
        li.setAttribute('draggable', 'true');

        // CORE UPDATE LI
        listContainer.appendChild(li);

        // Gan nut delete
        let span = document.createElement("span");
        span.innerHTML = "";
        span.className = "delete_button";
        let i = document.createElement("i");
        i.innerHTML = "";
        i.className = "fa-solid fa-trash";
        span.appendChild(i);
        li.appendChild(span);

        // Gan nut edit
        let span_edit = document.createElement("span");
        span_edit.innerHTML = "";
        span_edit.className = "edit_button";
        let i_edit = document.createElement("i");
        i_edit.innerHTML = "";
        i_edit.className = "fa-solid fa-pen-to-square";
        span_edit.appendChild(i_edit);
        li.appendChild(span_edit);
    }
    // Xoa du lieu dang luu o input
    inputBox.value = "";
    // Luu lai data vao trinh duyet
    saveData();
    
}

// Ham xu ly input Enter
inputBox.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});


// Ham xoa bo va check
listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.className === "delete_button" ) {

        //activateDeleteListeners_button();
        e.target.parentElement.remove();
        saveData();
    }
    else if (e.target.className === "fa-solid fa-trash") {
       // activateDeleteListeners_icon();
       e.target.parentElement.parentElement.remove();
        saveData();
    }
    else if (e.target.className === "edit_button" ) {
        let tmp = e.target;
        let li = e.target.parentElement;
        let input = li.getElementsByTagName('input')[0];
        input.readOnly = false;
        input.className = "line";
        input.maxLength = 37;

        e.target.className = "close_button";
        e.target.children.className = "fa-solid fa-x";
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
              event.preventDefault();
              input.readOnly = true;
              input.className = "none";
                tmp.className = "edit_button";
                tmp.children.className = "fa-solid fa-pen-to-square";
                saveData();
            }
        });
        saveData();
        li.getElementsByTagName('input')[0].addEventListener("input", function(event) {
            const newValue = event.target.value;
            li.getElementsByTagName('input')[0].setAttribute("value", newValue); // Update the value attribute
        });
        saveData();
    }
    else if (e.target.className === "fa-solid fa-pen-to-square") {
        let tmp = e.target;
        let li = e.target.parentElement.parentElement;
        let input = li.getElementsByTagName('input')[0];
        input.readOnly = false;
        input.className = "line";
        input.maxLength = 37;

        e.target.className = "fa-solid fa-x";
        e.target.parentElement.className = "close_button";
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
              event.preventDefault();
              input.readOnly = true;
              input.className = "none";
                tmp.children.className = "edit_button";
                tmp.className = "fa-solid fa-pen-to-square";
                saveData();
            }
        });
        saveData();
        li.getElementsByTagName('input')[0].addEventListener("input", function(event) {
            const newValue = event.target.value;
            li.getElementsByTagName('input')[0].setAttribute("value", newValue); // Update the value attribute
        });
        saveData();
    }
    else if (e.target.className === "close_button" ) {
        let li = e.target.parentElement;
        let input = li.getElementsByTagName('input')[0];
        input.readOnly = true;
        input.className = "none";

        e.target.className = "edit_button";
        e.target.children.className = "fa-solid fa-pen-to-square";
        saveData();
    }
    else if (e.target.className === "fa-solid fa-x") {
        let li = e.target.parentElement.parentElement;
        let input = li.getElementsByTagName('input')[0];
        input.readOnly = true;
        input.className = "none";
        
        e.target.className = "fa-solid fa-pen-to-square";
        e.target.parentElement.className = "edit_button";
        saveData();
    }
},false);

// Ham luu data vao trinh duyet
function saveData() {
    localStorage.setItem("data",listContainer.innerHTML);
    //localStorage.setItem("inputValues", JSON.stringify(tasks));
}
// Ham display data moi lan ta mo lai web
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
// Sử dụng Sortable để thêm chức năng kéo thả
const sortable = new Sortable(listContainer, {
    animation: 250,
    onEnd: function () {
      saveData();
    }
});

// Hien thi ra man hinh 
showTask();
