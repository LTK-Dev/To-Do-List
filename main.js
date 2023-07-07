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
        // Tao mot tag li moi
        let li = document.createElement("li");
        // Gan gia tri
        li.innerHTML = inputBox.value;
        // Gan tag li vao tag id listcontainer
        listContainer.appendChild(li);

        // Gan nut delete
        let span = document.createElement("span");
        span.innerHTML = "";
        let i = document.createElement("i");
        i.innerHTML = "";
        i.className = "fa-solid fa-trash";
        span.appendChild(i);
        li.appendChild(span);
    }
    // Xoa du lieu dang luu o input
    inputBox.value = "";
    // Luu lai data vao trinh duyet
    saveData();
}

// Ham xoa bo va check
listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN" ) {
        e.target.parentElement.remove();
        saveData();
    }
    else if (e.target.tagName === "I") {
        e.target.parentElement.parentElement.remove();
        saveData();
    }
},false);

// Ham luu data vao trinh duyet
function saveData() {
    localStorage.setItem("data",listContainer.innerHTML);
}
// Ham display data moi lan ta mo lai web
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();