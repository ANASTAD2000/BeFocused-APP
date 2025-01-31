// get element from html 
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskPriority = document.getElementById('taskPriority');
const taskList = document.getElementById('taskList'); 


let tasks = [];

// add event to the submit btn 
function addTask(event) {  
       event.preventDefault();  
 
    const title = taskTitle.value;
    const description = taskDescription.value;
    const priority = taskPriority.value;
    // Create a new  object
    const newTask = {
        title: title,
        description: description,
        priority: priority,
        completed: false
    };
    // push the new task to array
    tasks.push(newTask);
   
    // Clear the form
    taskForm.reset();
    displayTasks();
   
    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
 



  



