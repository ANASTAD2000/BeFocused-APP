const taskTitleInput = document.getElementById("title :");
const taskDescriptionInput = document.getElementById("descrioption ");
const prioritySelect = document.getElementById("Priority");
const addTaskButton = document.getElementById("addTask");

addTaskButton.addEventListener('submit',function(e) {
    e.preventDefault();

    // get priority 
    const selectedPriority = Array.from(Priority).find(radio => radio.checked);

// creat titel


});