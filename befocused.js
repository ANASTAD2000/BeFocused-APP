// Task Management Section

// Get task-related elements from the HTML
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskPriority = document.getElementById('taskPriority');
const taskList = document.getElementById('taskList');

// Store our tasks in an array
let tasks = [];
let currentlyEditing = null;

// Function to add a new task
function addTask(event) {
    event.preventDefault();
    
    const title = taskTitle.value;
    const description = taskDescription.value;
    const priority = taskPriority.value;
    
    if (currentlyEditing) {
        const taskToEdit = tasks.find(task => task.id === currentlyEditing);
        taskToEdit.title = title;
        taskToEdit.description = description;
        taskToEdit.priority = priority;
        currentlyEditing = null;
        document.querySelector('button[type="submit"]').textContent = 'Add Task';
    } else {
        const newTask = {
            id: Date.now(),
            title: title,
            description: description,
            priority: priority,
            completed: false
        };
        tasks.push(newTask);
    }
    
    taskForm.reset();
    displayTasks();
}

// Function to display all tasks
function displayTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const template = document.getElementById('taskTemplate');
        const taskElement = template.content.cloneNode(true);
        
        const taskDiv = taskElement.querySelector('.list-group-item');
        const titleSpan = taskElement.querySelector('.task-title');
        const descriptionSpan = taskElement.querySelector('.task-description');
        const checkbox = taskElement.querySelector('.task-check');
        
        titleSpan.textContent = task.title;
        descriptionSpan.textContent = task.description;
        checkbox.checked = task.completed;
        
       
        
        // Setup task controls
        const editButton = taskElement.querySelector('.edit-task');
        editButton.onclick = () => editTask(task);
        
        const deleteButton = taskElement.querySelector('.delete-task');
        deleteButton.onclick = () => deleteTask(task.id);
        
        checkbox.onchange = () => toggleComplete(task.id);
        
        taskList.appendChild(taskElement);
    });
}




// Function to edit a task
function editTask(task) {
    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskPriority.value = task.priority;
    currentlyEditing = task.id;
    document.querySelector('button[type="submit"]').textContent = 'Update Task';
}

// Function to delete a task
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== taskId);
        displayTasks();
    }
}

// Function to toggle task completion





