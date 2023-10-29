export function createModal(modaltype, tarea = null) {
    let modalbg = document.createElement('div');
    modalbg.className = 'modal-bg';
    let modalInnerHTML = '';

    if (modaltype === 'modal-add-task') {
        modalInnerHTML = `
            <div class="modal-task-add">
                <h2>Agregar Tarea</h2>
                <label for="title">Título:</label>
                <input type="text" id="title" name="title">
                <label for="description">Descripción:</label>
                <textarea id="description" name="description"></textarea>
                <label for="completed">Completada:</label>
                <input type="checkbox" id="completed" name="completed">
                <label for="priority">Prioridad:</label>
                <select id="priority" name="priority">
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>
                <label for="dueDate">Fecha de Vencimiento:</label>
                <input type="date" id="dueDate" name="dueDate">
                <button id="btn-add-task" class="btn">Agregar Tarea</button>
            </div>
        `;
    } else if (modaltype === 'modal-task-details' && tarea) {
        modalInnerHTML = `
            <div class="modal-task">
                <h2>Detalles de Tarea</h2>
                <p><strong>Título:</strong> ${tarea.title}</p>
                <p><strong>Descripción:</strong> ${tarea.description}</p>
                <p><strong>Estado:</strong> ${tarea.completed ? 'Completada' : 'Pendiente'}</p>
                <p><strong>Prioridad:</strong> ${tarea.priority}</p>
                <p><strong>Fecha de Vencimiento:</strong> ${tarea.dueDate}</p>
            </div>
        `;
    }else if (modaltype === 'modal-task-edit' && tarea) {
        // Modal para editar la tarea
        modalInnerHTML = `
            <div class="modal-task-edit">
                <h2>Editar Tarea</h2>
                <label for="editedTitle">Título:</label>
                <input type="text" id="editedTitle" value="${tarea.title}">
                <label for="editedDescription">Descripción:</label>
                <textarea id="editedDescription">${tarea.description}</textarea>
                <label for="editedCompleted">Estado:</label>
                <input type="checkbox" id="editedCompleted" ${tarea.completed ? 'checked' : ''}>
                <label for="editedPriority">Prioridad:</label>
                <select id="editedPriority">
                    <option value="Alta" ${tarea.priority === 'Alta' ? 'selected' : ''}>Alta</option>
                    <option value="Media" ${tarea.priority === 'Media' ? 'selected' : ''}>Media</option>
                    <option value="Baja" ${tarea.priority === 'Baja' ? 'selected' : ''}>Baja</option>
                </select>
                <label for="editedDueDate">Fecha de Vencimiento:</label>
                <input type="date" id="editedDueDate" value="${tarea.dueDate}">
                <button id="btn-save-changes" class="btn">Guardar Cambios</button>
            </div>
        `;
    }

    // Agrega el elemento modal al modalbg
    modalbg.innerHTML = modalInnerHTML

    // Agrega un event listener al modalbg para cerrar el modal al hacer clic fuera
    modalRemove(modalbg)

    const main = document.querySelector('main')
    main.appendChild(modalbg)
}

export function modalRemove(modalbg) {
    modalbg.addEventListener('click', function (event) {
        if (event.target === modalbg) {
            if (modalbg) {
                modalbg.remove()
            }
        }
    })
}
