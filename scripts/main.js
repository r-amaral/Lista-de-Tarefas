const addTaskButton = document.querySelector('.add__task__button');
const addTaskInput = document.querySelector('.add__task__input');
const sectionTask = document.querySelector('.tasks');

addTaskButton.addEventListener("click", addTask);
addTaskInput.addEventListener("keyup", event => event.key == 'Enter' ? addTask() : null)

function addTask() {
    const inputTask = document.querySelector('.add__task__input');

    if (inputTask.value == '') {
        alert('Nenhum valor adicionado no campo');
        return;
    }

    data.list.push({
        id: data.id,
        value: inputTask.value,
        checkStatus: false
    });

    data.id++;
    inputTask.value = null;

    render();
}

function render() {

    sectionTask.innerHTML = null;
    data.list.map(item => {
        sectionTask.innerHTML += `
        <article class="tasks__content">
            <div class='task__checkbox__content'>
                <input onclick="completedTask()" id='check-${item.id}' class='task__checkbox' type="checkbox">
                <label for="check-${item.id}"></label>
            </div>
            <div class='task__input__content'>
                <input value="${item.value}" id='${item.id}' class='task__input' type="text" disabled>
                <button onclick="editTask(${item.id})" class="task__button taks__edit__button">EDITAR</button>
                <button onclick="deleteTask(${item.id})" class='task__button  task__delete__button'>ELIMINAR</button>
            </div>
        </article>
    `;
    })
    updateCheckBox();
    infoTaskStatus();
    save();
}

function updateCheckBox() {
    data.list.map(item => {
        if (item.checkStatus == true) {
            document.querySelector(`#check-${item.id}`).checked = true;
        } else document.querySelector(`#check-${item.id}`).checked = false;
    })
}

function editTask(id) {
    const inputTaskCollection = document.querySelectorAll('.task__input');

    let elementObject = data.list.findIndex(element => element.id == id);
    let input = inputTaskCollection[elementObject];

    input.disabled = false;
    input.focus();
    input.setSelectionRange(500, 500);

    input.addEventListener('focusout', saveData);
    input.addEventListener('keydown', event => event.key == 'Enter' ? saveData() : null)

    function saveData() {
        data.list[elementObject].value = input.value;
        input.disabled = true;
        save();
    }
}

function completedTask() {

    const checkBoxTask = document.querySelectorAll('.task__checkbox');
    data.list.map((item, index) => {
        if (checkBoxTask[index].checked) {
            item.checkStatus = true;
        } else item.checkStatus = false;
    })
    render();
}

function deleteTask(id) {

    if (!confirm('Tem certeza que deseja apagar essa tarefa?')) return;

    const taskElement = document.querySelectorAll('.tasks__content');
    const inputTaskCollection = document.querySelectorAll('.task__input');

    let elementObject = data.list.findIndex(element => element.id == id)
    let idInput = inputTaskCollection[elementObject].id;

    data.list = data.list.filter(item => item.id != idInput);

    taskElement[elementObject].remove();
    localStorage.removeItem(`input-value-${elementObject}`);
    infoTaskStatus();
    save();
}

function infoTaskStatus() {

    const spanElement = document.querySelector('#total-tasks-completed');

    let taskCompleted = data.list.filter(item => item.checkStatus == true);
    let taskTotal = data.list.length;

    if (taskTotal == 0) {
        spanElement.innerHTML = `Nenhuma tarefa adicionada a lista`;
    } else spanElement.innerHTML = `foram completadas ${taskCompleted.length} de ${taskTotal} tarefas`;
}