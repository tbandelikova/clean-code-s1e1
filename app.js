const taskInput = document.querySelector('.new__text-input');
const addButton = document.querySelector('.new__button');
const incompleteTaskHolder = document.querySelector('.incomplete__task-list');
const completedTasksHolder = document.querySelector('.completed__task-list');

//New task list item
const createElement = (tag, options) => {
    const element = document.createElement(tag);
    Object.assign(element, options);
    return element;
}

const createNewTaskElement = (taskString) => {

    const listItem = createElement('li', {
        className: 'task-list__item'
    });

    const checkBox = createElement('input', {
        type: 'checkbox',
        className: 'checkbox'
    });

    const label = createElement('label', {
        innerText: taskString,
        className: 'task'
    });

    const editInput = createElement('input', {
        type: 'text',
        className: 'text-input'
    })

    const editButton = createElement('button', {
        type: 'button',
        innerText: 'Edit',
        className: 'button button_edit'
    });

    const deleteButton = createElement('button', {
        type: 'button',
        className: 'button button_delete'
    });

    const deleteButtonImg = createElement('img', {
        src: './remove.svg',
        className: 'button_delete__img',
        alt: 'Remove'
    });

    //Appending.
    deleteButton.append(deleteButtonImg);
    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
}

const addTask = () => {
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.append(listItem);
    taskInput.value = '';
    bindTaskEvents(listItem, taskCompleted);
}

//Edit an existing task.
const editTask = (e) => {
    const listItem = e.target.parentNode;

    const editInput = listItem.querySelector('.text-input');
    const label = listItem.querySelector('.task');
    const editBtn = listItem.querySelector('.button_edit');
    const containsClass = listItem.classList.contains('task-list__item_editmode');

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }

    listItem.classList.toggle('task-list__item_editmode');
};

//Delete task.
const deleteTask = (e) => {
    const listItem = e.target.closest('button').parentNode;
    listItem.remove();
}

//Mark task completed
const taskCompleted = (e) => {
    if (e.target.checked) {
        const listItem = e.target.parentNode;
        completedTasksHolder.append(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    }
}

//Mark task as incomplete.
const taskIncomplete = (e) => {
    if (!e.target.checked) {
        const listItem = e.target.parentNode;
        incompleteTaskHolder.append(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }
}

//Set the event handlers.
addButton.addEventListener('click', addTask);

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    //select ListItems children
    const checkBox = taskListItem.querySelector('.checkbox');
    const editButton = taskListItem.querySelector('.button_edit');
    const deleteButton = taskListItem.querySelector('.button_delete');

    //Add eventlisteners.
    editButton.addEventListener('click', editTask);
    deleteButton.addEventListener('click', deleteTask);
    checkBox.addEventListener('change', checkBoxEventHandler);
}

//cycle over incompleteTaskHolder ul list items
Array.from(incompleteTaskHolder.children).forEach(child => bindTaskEvents(child, taskCompleted));

//cycle over completedTasksHolder ul list items
Array.from(completedTasksHolder.children).forEach(child => bindTaskEvents(child, taskIncomplete));
