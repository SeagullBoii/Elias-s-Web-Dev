document.getElementById("back-button").onclick = function () {
    window.location.href = "../index.html";
};

const addButton = document.getElementById('add-button');
const inputField = document.getElementById('new-item');
const todoList = document.getElementById('todo-list');

loadItems();

addButton.addEventListener('click', addItem);
inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addItem();
    }
});

document.getElementById("clear-button").onclick = function () {
    while (todoList.firstChild)
        todoList.removeChild(todoList.firstChild);
    saveItems();
};

function addItem() {
    const newItemText = inputField.value.trim();
    if (newItemText !== '') {
        const li = document.createElement('li');
        li.draggable = true;
        li.appendChild(document.createTextNode(newItemText));

        const deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('X'));
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveItems();
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);

        inputField.value = '';
        inputField.focus();

        enableDragAndDrop(li);
        saveItems();
    }
}

function enableDragAndDrop(item) {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', e.target.innerHTML);
        e.target.classList.add('dragging');
    });

    item.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        saveItems();
    });

    item.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const draggingItem = document.querySelector('.dragging');
        if (draggingItem && e.target !== draggingItem) {
            const bounding = e.target.getBoundingClientRect();
            const offset = bounding.y + (bounding.height / 2);
            if (e.clientY - offset > 0) {
                e.target.after(draggingItem);
            } else {
                e.target.before(draggingItem);
            }
        }
    });

    item.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const draggingItem = document.querySelector('.dragging');
        if (draggingItem) {
            draggingItem.classList.remove('dragging');
            saveItems();
        }
    });
}

function saveItems() {
    const items = [];
    document.querySelectorAll('#todo-list li').forEach((li) => {
        items.push(li.firstChild.textContent);
    });
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function loadItems() {
    const savedItems = JSON.parse(localStorage.getItem('todoItems'));
    if (savedItems) {
        savedItems.forEach((itemText) => {
            const li = document.createElement('li');
            li.draggable = true;
            li.appendChild(document.createTextNode(itemText));

            const deleteButton = document.createElement('button');
            deleteButton.appendChild(document.createTextNode('X'));
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                li.remove();
                saveItems();
            });

            li.appendChild(deleteButton);
            todoList.appendChild(li);

            enableDragAndDrop(li);
        });
    }
}
