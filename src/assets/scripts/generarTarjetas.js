import { createModal } from './modal.js'


const apiURL = 'https://653485e2e1b6f4c59046c7c7.mockapi.io/api/users/219204846/tasks'

export function generateTasks(task) {
    const container = document.getElementById('new-item-section');

    task.forEach((tarea) => {
        const card = document.createElement('div');
        card.classList.add('new-item-card', 'f-display');

        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('details-container');

        const title = document.createElement('h3');
        title.classList.add('title');
        title.textContent = tarea.title;

        const status = document.createElement('p');
        status.classList.add('status');
        status.textContent = tarea.completed ? 'Completada' : 'Pendiente';

        const priority = document.createElement('p');
        priority.classList.add('priority');
        priority.textContent = `Prioridad: ${tarea.priority}`;

        const id = document.createElement('div');
        id.setAttribute('data-id', tarea.id);

        const dueDate = document.createElement('p');
        dueDate.classList.add('dueDate');
        dueDate.textContent = `Fecha de vencimiento: ${tarea.dueDate}`;

        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('delete-card');
        deleteIcon.textContent = '❌';

        deleteIcon.addEventListener('click', function (event) {
            const cardId = id.getAttribute('data-id'); // Obtiene la ID de la tarjeta desde el atributo 'data-id'
            console.log('ID de la tarjeta:', cardId); // Muestra la ID en la consola para verificación

            // Realizar la solicitud DELETE a la API
            fetch(`${apiURL}/${cardId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        // Si la eliminación en la API es exitosa, elimina la tarjeta del DOM
                        card.remove();
                        console.log('Tarea eliminada de la base de datos:', cardId);
                    } else {
                        console.error('Error al eliminar la tarea de la base de datos');
                    }
                })
                .catch(error => {
                    console.error('Error al eliminar la tarea de la base de datos:', error);
                });
        });

        const button = document.createElement('button');
        button.classList.add('item-card-btn', 'btn');
        button.textContent = 'Detalles';
        button.onclick = function () {
            createModal('modal-task-details', tarea);
        };

        const buttonEdit = document.createElement('button')
        buttonEdit.classList.add('item-card-btn', 'btn');
        buttonEdit.textContent = 'Editar Tarea'
        buttonEdit.onclick = function () {
            createModal('modal-task-edit', tarea);

            // Agregar la lógica para editar la tarea aquí
            const btnSaveChanges = document.getElementById('btn-save-changes');

            if (btnSaveChanges) {
                btnSaveChanges.addEventListener('click', async function (event) {
                    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

                    // Obtener los valores editados desde el modal
                    const editedTitle = document.getElementById('editedTitle').value;
                    const editedDescription = document.getElementById('editedDescription').value;
                    const editedCompleted = document.getElementById('editedCompleted').checked;
                    const editedPriority = document.getElementById('editedPriority').value;
                    const editedDueDate = document.getElementById('editedDueDate').value;

                    // Actualizar los detalles de la tarea con los nuevos valores editados
                    tarea.title = editedTitle;
                    tarea.description = editedDescription;
                    tarea.completed = editedCompleted;
                    tarea.priority = editedPriority;
                    tarea.dueDate = editedDueDate;

                    try {
                        // Realizar la solicitud PUT para editar la tarea en la API
                        const response = await fetch(`${apiURL}/${tarea.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(tarea),
                        });

                        if (!response.ok) {
                            throw new Error('Error al editar la tarea');
                        }

                        // Actualizar las tareas después de la edición
                        actualizarTareas();


                    } catch (error) {
                        console.error('Error al editar la tarea:', error);
                    }
                });

            }
        };


        detailsContainer.appendChild(title);
        detailsContainer.appendChild(status);
        detailsContainer.appendChild(priority);
        detailsContainer.appendChild(dueDate);
        detailsContainer.appendChild(button);
        detailsContainer.appendChild(deleteIcon);
        detailsContainer.appendChild(buttonEdit);

        card.appendChild(detailsContainer);
        container.appendChild(card);
    });
}

//Funcion para cargar datos desde la API
async function loadTasksData() {
    try {
        const response = await fetch(apiURL)
        if (!response.ok) {
            throw new Error('No se pudo cargar la API de tareas.')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

//Define la varieble de task en un alcance más amplio
let task

//cargar los datos y generar tarjetas iniciales

loadTasksData().then((data) => {
    task = data
    generateTasks(task)
})
    .catch((error) => {
        console.error('Error al cargar datos', error)
    })

function actualizarTareas() {
    // Puedes llamar a la función que obtiene las tareas desde la API
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            location.reload();
        })
        .catch(error => {
            console.error('Error al actualizar las tareas:', error);
        });
}


