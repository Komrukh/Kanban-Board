document.addEventListener('DOMContentLoaded', () => {
    const createTaskForm = document.getElementById('create-task-form');
    const updateTaskForm = document.getElementById('update-task-form');

    const newTaskFormContainer = document.getElementById('new-task-form');
    const editTaskFormContainer = document.getElementById('edit-task-form');

    const todoTasks = document.getElementById('todo-tasks');
    const inProgressTasks = document.getElementById('in-progress-tasks');
    const doneTasks = document.getElementById('done-tasks');

    const sortTasksSelect = document.getElementById('sort-tasks');
    const filterStatusSelect = document.getElementById('filter-status');

    let tasks = [];

    const fetchTasks = (projectId) => {
        fetch(`/api/projects/${projectId}/tasks`) // Конечная точка API с учетом projectId
            .then(response => response.json())
            .then(fetchedTasks => {
                tasks = fetchedTasks;
                displayTasks(tasks);
            });
    };

    const displayTasks = (tasks) => {
        todoTasks.innerHTML = '';
        inProgressTasks.innerHTML = '';
        doneTasks.innerHTML = '';

        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            switch (task.status) {
                case 'To Do':
                    todoTasks.appendChild(taskElement);
                    break;
                case 'In Progress':
                    inProgressTasks.appendChild(taskElement);
                    break;
                case 'Done':
                    doneTasks.appendChild(taskElement);
                    break;
            }
        });
    };

    const createTaskElement = (task) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.textContent = task.title;
        taskDiv.draggable = true;
        taskDiv.dataset.id = task.id;
        taskDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', task.id);
        });
        taskDiv.addEventListener('dblclick', () => {
            document.getElementById('edit-task-id').value = task.id;
            document.getElementById('edit-task-title').value = task.title;
            document.getElementById('edit-task-description').value = task.description;
            document.getElementById('edit-task-status').value = task.status;
            document.getElementById('new-task-form').style.display = 'none';
            document.getElementById('edit-task-form').style.display = 'block';
        });
        return taskDiv;
    };

    const columns = document.querySelectorAll('.column .task-list');
    columns.forEach(column => {
        column.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        column.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            const taskElement = document.querySelector(`.task[data-id="${taskId}"]`);
            event.target.appendChild(taskElement);

            const newStatus = event.target.closest('.column').id.replace('-tasks', '');
            updateTaskStatus(taskId, newStatus);
        });
    });

    const updateTaskStatus = (taskId, newStatus) => {
        fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
            .then(response => response.json())
            .then(task => {
                const taskElement = document.querySelector(`.task[data-id="${task.id}"]`);
                taskElement.dataset.status = task.status;
            });
    };

    createTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const projectId = 1;
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const status = document.getElementById('task-status').value;

        const newTask = {
            title: title,
            description: description,
            status: status
        };

        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(response => response.json())
            .then(task => {
                tasks.push(task);
                displayTasks(tasks);
                createTaskForm.reset();
            });
    });

    updateTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = document.getElementById('edit-task-id').value;
        const title = document.getElementById('edit-task-title').value;
        const description = document.getElementById('edit-task-description').value;
        const status = document.getElementById('edit-task-status').value;

        const updatedTask = {
            id: id,
            title: title,
            description: description,
            status: status
        };

        fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
            .then(response => response.json())
            .then(task => {
                const index = tasks.findIndex(t => t.id === task.id);
                tasks[index] = task;
                displayTasks(tasks);
                editTaskFormContainer.style.display = 'none';
                newTaskFormContainer.style.display = 'block';
                updateTaskForm.reset();
            });
    });


    sortTasksSelect.addEventListener('change', (event) => {
        const sortBy = event.target.value;
        tasks.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        });
        displayTasks(tasks);
    });


    filterStatusSelect.addEventListener('change', (event) => {
        const filterBy = event.target.value;
        if (filterBy === 'all') {
            displayTasks(tasks);
        } else {
            const filteredTasks = tasks.filter(task => task.status === filterBy);
            displayTasks(filteredTasks);
        }
    });

    fetchTasks(1);
});
