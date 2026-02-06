let taskInput = document.getElementById('taskInput');
let addBtn = document.getElementById('addBtn');
let taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addBtn.addEventListener('click', () => addTask());

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const index = e.target.parentElement.dataset.index;
        tasks.splice(index, 1);
    } else if (e.target.tagName === 'LI') {
        const index = e.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;
    }
    saveAndRender();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    saveAndRender();
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.textContent = task.text;
        li.dataset.index = index;

        if (task.completed) {
            li.classList.add('completed');
        }

        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.classList.add('delete');

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}