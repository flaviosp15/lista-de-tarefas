let btnAddTarefa = document.getElementById('button-add-todo'); //BOTÃO 'ADICIONAR'
let checkTodasTarefas = document.getElementById('select-all-boxes'); //CHECKBOX 'MARCAR E DESMARCAR TODAS AS TAREFAS'
let gatilhoDeletar = document.getElementById('button-delete-1'); //BOTÃO 'EXCLUIR TODAS AS TAREFAS SELECIONADAS'
let simDeletarTarefas = document.getElementById('button-delete-all-todo'); //BOTÃO 'SIM' (dentro do modal)
let checkboxes = document.querySelectorAll('.box'); //CHECKBOXES DAS TAREFAS
let cardBody = document.querySelector('.card-body'); //CORPO DA APLICAÇÃO
let inputTarefa = document.querySelector('.form-control'); //INPUT DE TAREFAS
let listaDesordenada = document.getElementById('lista'); //LISTA
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

//========================================== FUNÇÕES =========================================

const renderizarTarefas = () => {
    listaDesordenada.innerHTML = "";
    for(let tarefa of tarefas) {
        //============================== ELEMENTO DA LISTA ==============================
        let itemLista = document.createElement('li');
            itemLista.setAttribute('class', 'list-group-item align-items-center d-flex');
        //============================== CHECKBOX DA TAREFA ==============================
        let checkBox = document.createElement('input');
            checkBox.setAttribute('class', 'box me-3');
            checkBox.setAttribute('type', 'checkbox');
        //============================== TEXTO DA TAREFA ==============================
        let span = document.createElement('span');
            span.setAttribute('class', 'flex-grow-1');
        let textoItem = document.createTextNode(tarefa);
        
        listaDesordenada.appendChild(itemLista);
        itemLista.appendChild(checkBox);
        itemLista.appendChild(span);
        span.appendChild(textoItem);
    }
    //Há uma iteração em todos os checkboxes, quando clicados a função, que desabilita o botão de deletar todas as tarefas, é ativada.
    for(let i = 0; i < listaDesordenada.children.length; i++) {
        let checkboxes = document.querySelectorAll('.box');
        checkboxes[i].onclick = () => {
            desabilitarBtnDel();
        }
    }
    desabilitarCheckbox();
}

const renderizarAlerta = () => {
    let alerta = document.createElement('div');
    let msg = document.createTextNode("Digite uma tarefa no campo acima!")
    alerta.setAttribute('class', 'alert alert-warning p-2 mb-3');
    alerta.appendChild(msg);
    cardBody.appendChild(alerta);
    cardBody.insertBefore(alerta, listaDesordenada);
}

const removerAlertas = () => {
    let divAlertas = document.querySelectorAll('.alert');
    for (let i = 0; i < divAlertas.length; i++) {
        cardBody.removeChild(divAlertas[i]);
    }
}

const removerTarefa = (tarefa) => {
    tarefas.splice(tarefas.indexOf(tarefa.parentElement.textContent), 1);
    renderizarTarefas();
    salvarDados();
}

const desabilitarCheckbox = () => {
    //A condição verifica se há elementos na lista, caso não tenha, o checkbox que marca e desmarca todas tarefas é desabilitado e desmarcado.
    if(tarefas.length == 0) {
        checkTodasTarefas.disabled = true;
        checkTodasTarefas.checked = false;
    }
    else {  //Se houver elementos na lista, o checkbox permanece ativo.
        checkTodasTarefas.disabled = false;
    }
}

const desabilitarBtnDel = () => {
    let checkboxes = document.querySelectorAll('.box');
    let arrayVazio = [];
    for(let i = 0; i < checkboxes.length; i++) {
        //Essa condição verifica se há checkbox selecionada, caso tenha, o elemento é inserido em um array.
        if(checkboxes[i].checked) {
            arrayVazio.push(checkboxes[i]);
        }
        //A quantidade de elementos no array é verificada, caso a quantidade seja 0(zero), o botão excluir todas as tarefas selecionadas é desabilitado.
        if(!arrayVazio.length == true) {
            gatilhoDeletar.disabled = true;
        }
        else {
            if(checkboxes[checkboxes.length - 1].checked) {
                gatilhoDeletar.disabled = false;
            }
            gatilhoDeletar.disabled = false;
        }
        msgModal(arrayVazio.length > 1);
    }
}

const msgModal = (boolean) => { //Personaliza a pergunta de acordo com a quantidade de tarefas selecionadas.
    let modalBody = document.querySelector('.modal-body');
    if(boolean) {
        modalBody.textContent = "Você realmente quer excluir as tarefas selecionadas?"
    }
    else {
        modalBody.textContent = "Você realmente quer excluir a tarefa selecionada?"
    }
}

const salvarDados = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

renderizarTarefas();

//========================================== CLICKS =========================================

btnAddTarefa.onclick = () => {
    let novaTarefa = inputTarefa.value;
    //Se houver valores digitados no campo 'Input', é renderizado um elemento na lista.
    if(inputTarefa.value !== "") {
        tarefas.push(novaTarefa);
        salvarDados();
        renderizarTarefas();
        removerAlertas();
        
    }
    else {  //Caso não tenha nenhum valor no 'Input', a aplicação emitirá um alerta.
        removerAlertas();
        renderizarAlerta();
    }
    inputTarefa.value = "";
    inputTarefa.focus();
    desabilitarCheckbox();
}

checkTodasTarefas.onclick = () => {
    let checkboxes = document.querySelectorAll('.box');
    //Há uma iteração por todos checkboxes da lista.
    for (let i = 0; i < checkboxes.length; i++) {
        //verifica se há algum checkbox na lista diferente do checkbox de marcar e desmarcar todos. 
        if(checkboxes.checked != checkTodasTarefas) {
            checkboxes[i].checked = checkTodasTarefas.checked;
        }
    }
    desabilitarBtnDel();
}

simDeletarTarefas.onclick = () => {
    let checkboxes = document.querySelectorAll('.box');
    for (let i = 0; i < checkboxes.length; i++) {
        //Caso o checkbox esteja selecionado, o elemento pai é removido, o botão deletar todas as tarefas é desabilitado e o checkbox marcar/desmarcar todos é desmarcado.
        if(checkboxes[i].checked) {
            removerTarefa(checkboxes[i]);
            gatilhoDeletar.disabled = true;
            checkTodasTarefas.checked = false;
            removerAlertas()
            desabilitarCheckbox();
            inputTarefa.value = '';
            inputTarefa.focus();
        }
    }
}