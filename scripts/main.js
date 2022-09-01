const addTaskButton = document.querySelector('.add__task__button');
const addTaskInput = document.querySelector('.add__task__input');
const sectionTask = document.querySelector('.tasks');

addTaskButton.addEventListener("click", addTask);
addTaskInput.addEventListener("keyup", event => event.key == 'Enter' ? addTask() : null)

sectionTask.addEventListener('click', event => {

    const inputTaskCollection = document.querySelectorAll('.task__input');
    const buttonEdit = document.querySelectorAll('.taks__edit__button');
    const deleteTaskButton = document.querySelectorAll('.task__delete__button');
    const checkBoxTask = document.querySelectorAll('.task__checkbox');

    if (event.key == 'Enter') {
        console.log(event.key)
    }

    for (let i = 0; i < inputTaskCollection.length; i++) {
        if (event.target == buttonEdit[i]) editTask(i);
        if (event.target == deleteTaskButton[i]) deleteTask(i);
        if (event.target == checkBoxTask[i]) completedTask();
    }
})

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
                <input id='check-${item.id}' class='task__checkbox' type="checkbox">
                <label for="check-${item.id}"></label>
            </div>
            <div class='task__input__content'>
                <input value="${item.value}" id='${item.id}' class='task__input' type="text" disabled>
                <button class="task__button taks__edit__button">EDITAR</button>
                <button class='task__button  task__delete__button'>ELIMINAR</button>
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

function editTask(indice) {
    const inputTaskCollection = document.querySelectorAll('.task__input');

    let input = inputTaskCollection[indice];

    input.disabled = false;
    input.focus();
    input.setSelectionRange(500, 500);

    input.addEventListener('focusout', saveData);
    input.addEventListener('keydown', event => event.key == 'Enter' ? saveData() : null)

    function saveData() {
        data.list[indice].value = input.value;
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

function deleteTask(indice) {

    if (!confirm('Tem certeza que deseja apagar essa tarefa?')) return;

    const taskElement = document.querySelectorAll('.tasks__content');
    const inputTaskCollection = document.querySelectorAll('.task__input');

    let idInput = inputTaskCollection[indice].id;

    data.list = data.list.filter(item => item.id != idInput);

    taskElement[indice].remove();
    localStorage.removeItem(`input-value-${indice}`);
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