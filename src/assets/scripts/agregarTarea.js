import { createModal } from './modal.js'
import { generateTasks } from './generarTarjetas.js';

document.addEventListener('DOMContentLoaded', function () {
    const btnAgregar = document.getElementById('agregarBtn');

    btnAgregar.addEventListener('click', function () {
        createModal('modal-add-task');

        const btnAgregarTareaModal = document.getElementById('btn-add-task');
        if (btnAgregarTareaModal) {
            btnAgregarTareaModal.addEventListener('click', function () {
                addTask();
            });
        }
    });
});

export function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const completed = document.getElementById('completed').checked;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('dueDate').value;

    const nuevaTarea = {
        title: title,
        description: description,
        completed: completed,
        priority: priority,
        dueDate: dueDate
    };

    fetch('https://653485e2e1b6f4c59046c7c7.mockapi.io/api/users/219204846/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaTarea)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Tarea agregada exitosamente:', data);
            alert('La tarea se ha agregado correctamente');
            updateTasksList();
        })
        .catch(error => {
            console.error('Error al agregar la tarea:', error);
        });

    // Limpia los campos del formulario después de agregar la tarea
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('completed').checked = false;
    document.getElementById('priority').value = 'Alta';
    document.getElementById('dueDate').value = '';
}

function updateTasksList() {
    const newTaskSection = document.getElementById('new-item-section');

    fetch('https://653485e2e1b6f4c59046c7c7.mockapi.io/api/users/219204846/tasks')
        .then(response => response.json())
        .then(data => {
            // Limpia la sección antes de agregar las tareas actualizadas
            newTaskSection.innerHTML = '';

            // Llama al método para generar las tarjetas con los datos recibidos
            generateTasks(data);
        })
        .catch(error => {
            console.error('Error al actualizar la lista de tareas:', error);
        });
}
