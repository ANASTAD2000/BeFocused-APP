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

// Initialize task event listeners
taskForm.addEventListener('submit', addTask);

// Timer Section

// Get timer-related elements from the HTML
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startTimer');
const pauseButton = document.getElementById('pauseTimer');
const resetButton = document.getElementById('resetTimer');
const workDurationInput = document.getElementById('workDuration');

let timeLeft = 25 * 60; // 25 minutes in seconds
let timerInterval = null;

// Function to update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to start timer
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                alert('Time is up!');
            }
        }, 1000);
    }
}

// Function to pause timer
function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Function to reset timer
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = workDurationInput.value * 60;
    updateTimerDisplay();
}

// Initialize timer event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
workDurationInput.addEventListener('change', resetTimer);

// Initial setup
displayTasks();
updateTimerDisplay();