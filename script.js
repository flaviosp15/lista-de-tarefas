let addButton = document.getElementById('button-add-todo');//BOTÃO 'ADICIONAR'
let checkboxSelectAll = document.getElementById('select-all-boxes');//CHECKBOX 'MARCAR E DESMARCAR TODAS AS TAREFAS'
let btnDeleteAll = document.getElementById('button-delete-1');//BOTÃO 'EXCLUIR TODAS AS TAREFAS SELECIONADAS'
let deleteButton = document.getElementById('button-delete-all-todo');//BOTÃO 'SIM' (dentro do modal)

/*====================================================== 
BOTÃO 'ADICIONAR' - ADICIONA OS ELEMENTOS NA LISTA
======================================================== */
addButton.onclick = () => {
    //============================== INPUT DE TEXTO ==============================
    let inputEl = document.querySelector('.form-control');
    let inputValue = document.querySelector('.form-control').value;
    let text = "";
    //============================== OBJETOS DE LISTA ==============================
    let unorderList = document.querySelector('.list-group');
    let toDoElemList = document.createElement('li');
        toDoElemList.setAttribute('class', 'list-group-item align-items-center d-flex');
    //let allElList = document.querySelectorAll('.list-group-item');
    //============================== CHECKBOX DAS TAREFAS ==============================
    let checkBox = document.createElement('input');
        checkBox.setAttribute('class', 'box me-3');
        checkBox.setAttribute('type', 'checkbox');
    //============================== TEXTO DA TAREFA ==============================
    let span = document.createElement('span');
        span.setAttribute('class', 'flex-grow-1');
    //============================== ICONE DA LIXEIRA ==============================
    let trash = document.createElement('i');
        trash.setAttribute('class', 'bx bx-trash');
        trash.style.cursor = 'pointer';
    //============================== ALERTA ==============================
    let alert = document.querySelector('.alert');

    //Se houver valores digitados no campo 'Input', é construído um elemento com vários componentes, na lista.
    if(inputValue !== "") {
        text = document.createTextNode(inputValue);
        unorderList.appendChild(toDoElemList);
        toDoElemList.appendChild(checkBox);
        toDoElemList.appendChild(span);
        span.appendChild(text);
        toDoElemList.appendChild(trash);
        trash.onclick = () => {
            //A primeira condição verifica se o checkbox está ativo ou não.
            if(trash.previousSibling.previousSibling.checked || trash.previousSibling.previousSibling.checked == false) {
                unorderList.removeChild(toDoElemList);
                inputEl.focus();
                disabledCheck();
                disabledBtnDelete();
                //Essa condição verifica se há elementos filhos dentro da lista, caso não tenha, o botão de deletar todas as tarefas selecionadas fica desabilitado.
                if(unorderList.hasChildNodes() == false) {
                    btnDeleteAll.disabled = true;
                }
            }
        }
        //Há uma iteração em todos os checkboxes, quando clicados a função que desabilita o botão de deletar todas as tarefas é ativada.
        for (let i = 0; i < unorderList.children.length; i++) {
            let boxes = document.querySelectorAll('.box');
            boxes[i].onclick = () => {
                disabledBtnDelete();
            }
        }
    }
    else {  //Caso não tenha nenhum valor no 'Input', a aplicação emitirá um alerta de 1.5s.
        alert.classList.add('alert', 'alert-warning', 'p-2', 'mb-3');
        alert.setAttribute('role', 'alert');
        alert.textContent = "Digite uma tarefa no campo acima!";
        setTimeout(() => {
            alert.setAttribute('class', 'alert m-0 p-0');
            alert.textContent = "";
        }, 1500);
    }
    inputEl.value = ""; //Limpa o campo 'Input'.
    inputEl.focus();    //Foca no campo 'Input'.
    disabledCheck();
}

/*====================================================== 
CHECKBOX - MARCA E DESMARCA TODOS
======================================================== */
checkboxSelectAll.onclick = () => {
    let boxes = document.querySelectorAll('.box');
    //Há uma iteração por todos checkboxes da lista.
    for (let i = 0; i < boxes.length; i++) {
        //verifica se há algum checkbox na lista diferente do checkbox de marcar e desmarcar todos. 
        if(boxes.checked != checkboxSelectAll) {
            boxes[i].checked = checkboxSelectAll.checked;
        }
    }
    disabledBtnDelete();
}

/*====================================================== 
CHECKBOX - HABILITADO E DESABILITADO
======================================================== */
const disabledCheck = () => {
    let unorderList = document.querySelector('.list-group');
    //A condição verifica se há elementos na lista, caso não tenha, o checkbox que marca e desmarca todas tarefas é desabilitado e desmarcado.
    if(unorderList.hasChildNodes() === false) {
        checkboxSelectAll.disabled = true;
        checkboxSelectAll.checked = false;
    }
    else {  //Se houver elementos na lista, o checkbox permanece ativo.
        checkboxSelectAll.disabled = false;
    }
}

/*====================================================== 
DELETA TODOS ELEMENTOS SELECIONADOS ---> alocado dentro do Modal no botão 'Sim'
======================================================== */
deleteButton.onclick = () => {
    let boxes = document.querySelectorAll('.box');
    let btnDeleteAll = document.getElementById('button-delete-1');
    let unorderList = document.querySelector('.list-group');

    for (let i = 0; i < boxes.length; i++) {
        //Caso o checkbox esteja selecionado, o elemento pai é removido, o botão deletar todas as tarefas é desabilitado e o checkbox marcar/desmarcar todos é desmarcado.
        if(boxes[i].checked) {
            boxes[i].parentElement.remove();
            btnDeleteAll.disabled = true;
            checkboxSelectAll.checked = false;
            disabledCheck();
            //Quando o último elemento da lista ficava desmarcado o botão de deletar todas as tarefas permanecia habilitado, para corrigir esse bug foi preciso criar uma condição específica para esse eleemento.
            if(unorderList.lastElementChild.firstElementChild.checked == false) {
                btnDeleteAll.disabled = true;
                disabledCheck();
            }
        }
    }
}

/*====================================================== 
BOTÃO EXCLUIR SELECIONADOS - HABILITADO E DESABILITADO
======================================================== */
const disabledBtnDelete = () => {
    let boxes = document.querySelectorAll('.box');
    let unorderList = document.querySelector('.list-group');
    let emptyArray = [];

    for(let i = 0; i < unorderList.children.length; i++) {
        //Essa condição verifica se há checkbox selecionada, caso tenha, o elemento é inserido em um array.
        if(boxes[i].checked) {
            emptyArray.push(boxes[i]);
        }
        //A quantidade de elementos no array é verificada, caso a quantidade seja 0(zero), o botão excluir todas as tarefas selecionadas é desabilitado.
        if(!emptyArray.length == true) {
            btnDeleteAll.disabled = true;
        }
        else {
            btnDeleteAll.disabled = false;
        }
    }
}