// main.js

// API Configuration
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Función para limpiar todas las tareas
function clearAllTasks() {
    const taskList = document.getElementById('task_list');
    taskList.innerHTML = '';
}

// Función para cargar tareas desde la API
async function loadTasksFromAPI() {
    console.log('loadTasksFromAPI llamada'); // Debug
    try {
        // Mostrar mensaje de carga
        const downloadBtn = document.getElementById('download_btn');
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<img src="src/img/descargar.png" alt="Cargando..." width="20" height="20">Cargando...';
        downloadBtn.disabled = true;

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todos = await response.json();

        // Limitar a las primeras 10 tareas para no sobrecargar la interfaz
        const limitedTodos = todos.slice(0, 10);

        // Limpiar tareas existentes (opcional - puedes comentar esta línea si quieres mantener las tareas locales)
        // clearAllTasks();

        limitedTodos.forEach(todo => {
            createTaskFromAPI(todo);
        });

        console.log(`Se cargaron ${limitedTodos.length} tareas desde la API`);
        filterTasks();

        // Restaurar botón
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;

    } catch (error) {
        console.error('Error al cargar tareas desde la API:', error);
        alert('Error al cargar tareas desde la API. Verifica tu conexión a internet.');

        // Restaurar botón en caso de error
        const downloadBtn = document.getElementById('download_btn');
        downloadBtn.innerHTML = '<img src="src/img/descargar.png" alt="Cargar tareas" width="20" height="20">';
        downloadBtn.disabled = false;
    }
}

// Función para crear una tarea desde datos de la API
function createTaskFromAPI(todo) {
    let red = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    let yellow = Math.floor(Math.random() * 255);

    let task_list = document.getElementById('task_list');

    // Lista
    let new_task = document.createElement('li');
    new_task.style.backgroundColor = `rgb(${red}, ${blue}, ${yellow})`;
    new_task.setAttribute('data-api-id', todo.id); // Guardar el ID de la API

    // CheckBox Button
    let taskCheckbox = document.createElement('input');
    taskCheckbox.type = "checkbox";
    taskCheckbox.style.width = "20px";
    taskCheckbox.checked = todo.completed;

    // Agregar evento al checkbox
    taskCheckbox.addEventListener('change', function () {
        if (this.checked) {
            taskText.style.textDecoration = "line-through";
        } else {
            taskText.style.textDecoration = "none";
        }
    });

    // Text
    let taskText = document.createElement('span');
    taskText.textContent = todo.title; // Usar el título de la API

    // Aplicar estilo si ya está completada
    if (todo.completed) {
        taskText.style.textDecoration = "line-through";
    }

    // Delete Button
    let taskDelete = document.createElement('button');
    taskDelete.innerHTML = '<img alt="boton-eliminar" src="src/img/eliminar.png" width="15px">';
    taskDelete.id = 'task_delete';

    taskDelete.addEventListener('click', () => {
        while (new_task.firstChild) {
            new_task.removeChild(new_task.firstChild);
        }
        new_task.remove();
    });

    // ADD TO new_task
    new_task.appendChild(taskCheckbox);
    new_task.appendChild(taskText);
    new_task.appendChild(taskDelete);
    task_list.appendChild(new_task);
}

// Event listener para el botón de cargar tareas de la API
function initDownloadButton() {
    const downloadBtn = document.getElementById('download_btn');
    console.log('Buscando botón de descarga:', downloadBtn); // Debug
    if (downloadBtn) {
        downloadBtn.addEventListener('click', loadTasksFromAPI);
        console.log('Event listener agregado al botón de descarga'); // Debug
        return true;
    } else {
        console.error('No se encontró el botón de descarga');
        return false;
    }
}

// Intentar inicializar el botón cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDownloadButton);
} else {
    // Si el DOM ya está cargado, inicializar inmediatamente
    initDownloadButton();
}

document.getElementById('task_info').addEventListener('change', () => {
    document.getElementById('task_info').style.borderColor = "black"
    document.getElementById('task_info').placeholder = "Task";
})

document.getElementById("add_task").addEventListener('click', () => {
    let red = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    let yellow = Math.floor(Math.random() * 255);

    let task = document.getElementById('task_info');
    let task_list = document.getElementById('task_list');


    if (task.value === '') {
        document.getElementById('task_info').style.borderColor = "red";
        document.getElementById('task_info').placeholder = "Error!";
    } else {

        // Lista
        let new_task = document.createElement('li');
        new_task.style.backgroundColor = `rgb(${red}, ${blue}, ${yellow})`;

        // CheckBox Button
        let taskCheckbox = document.createElement('input');
        taskCheckbox.type = "checkbox";
        taskCheckbox.style.width = "20px";

        // Agregar evento al checkbox
        taskCheckbox.addEventListener('change', function () {
            if (this.checked) {
                taskText.style.textDecoration = "line-through";
            } else {
                taskText.style.textDecoration = "none";
            }
        });

        // Text
        let taskText = document.createElement('span');
        taskText.textContent = task.value;

        // Delete Button
        let taskDelete = document.createElement('button');
        taskDelete.innerHTML = '<img alt="boton-eliminar" src="src/img/eliminar.png" width="15px">';
        taskDelete.id = 'task_delete';

        taskDelete.addEventListener('click', () => {
            while (new_task.firstChild) {
                new_task.removeChild(new_task.firstChild);
            }
            new_task.remove();
        });

        // ADD TO new_task
        new_task.appendChild(taskCheckbox);
        new_task.appendChild(taskText);
        new_task.appendChild(taskDelete);
        task_list.appendChild(new_task);

        task.value = '';

        filterTasks();
    }

});

document.querySelectorAll('input[name="filter"]').forEach(radio => {
    radio.addEventListener('change', filterTasks);
});

function filterTasks() {
    const checkedFilter = document.querySelector('input[name="filter"]:checked');

    // Si no hay ningún filtro seleccionado, seleccionar "All" por defecto
    if (!checkedFilter) {
        document.getElementById('filter_all').checked = true;
        return; // Salir y no aplicar filtros hasta que se seleccione uno
    }

    const filterValue = checkedFilter.id;
    const tasks = document.querySelectorAll('#task_list li');

    tasks.forEach(task => {
        const isChecked = task.querySelector('input[type="checkbox"]').checked;

        switch (filterValue) {
            case 'filter_all':
                task.style.display = '';
                break;
            case 'filter_noncompleted':
                task.style.display = isChecked ? 'none' : '';
                break;
            case 'filter_completed':
                task.style.display = isChecked ? '' : 'none';
                break;
        }
    });
}