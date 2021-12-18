// Selectors
const txt = document.querySelector('.txt');
const btnAdd = document.querySelector('.btn_add');
const cardList = document.querySelector('.card_list');
const tab = document.querySelector('.tab');
const tabItems = document.querySelectorAll('.tab_item');
const list = document.querySelector('.list');
const taskRemain = document.querySelector('.task_remain');
const taskOrganize = document.querySelector('.task_organize');

// Set Up LocalStorage
var todolists;
if(localStorage.getItem('todolists') === null){
    todolists = [];
}else{
    todolists = JSON.parse(localStorage.getItem('todolists'));
}

// Reset
renderData();

// Add Todolist
btnAdd.addEventListener('click', ()=>{
    if(txt.value == "") {
        alert('請輸入內容');
        return;
    }else{
        let todolist = {};
        todolist.content = txt.value;
        todolist.check = false;
        todolists.push(todolist);
        localStorage.setItem('todolists', JSON.stringify(todolists));
        renderData();
        txt.value = "";
    }
});

// Delete Todolist
list.addEventListener('click', e => {
    if(e.target.getAttribute("class") !== "delete"){
        return;
    }else{
        const todoText = e.target.parentElement.children[0].innerText;
        todolists.splice(todolists.map(x => x.content).indexOf(todoText), 1);
        localStorage.setItem('todolists', JSON.stringify(todolists));
        renderData();
    }
});

// Delete tabItems--Checked
taskOrganize.addEventListener('click', () => {
    let deleteChecked = confirm('您確定要刪除所有已完成的項目嗎？')
    if(deleteChecked == true) {
        todolists.forEach(todolist => {
            if(todolist.check == true){
                const todoText = todolist.content;
                todolists.splice(todolists.map(x => x.content).indexOf(todoText), 1);
                localStorage.setItem('todolists', JSON.stringify(todolists));
                renderData();
            }else{
                return
            }
        });
    }else{
        return
    }
});

// Check Toggle
list.addEventListener('click', e => {
    if(e.target.name !== 'checkbox'){
        return
    }else{
        const todoText = e.target.parentElement.children[1].innerText;
        const todoIndex = todolists.map(x => x.content).indexOf(todoText);
        if(todolists[todoIndex].check == false) {
            todolists[todoIndex].check = true;
        }else{
            todolists[todoIndex].check = false;
        }
        localStorage.setItem('todolists', JSON.stringify(todolists));
        renderData();
    }
});

// Tabs Switch
tab.addEventListener('click', (e)=> {
    tabItems.forEach(tabItem => {
        tabItem.classList.remove('active');
    });
    e.target.classList.add('active');
    renderData();
});

// Render Data
function renderData() {
    if(todolists === null || todolists[0] === undefined){
        cardList.classList.add('d-none');
    }else if(todolists !== null && cardList.classList.contains('d-none')){
        cardList.classList.remove('d-none');
    }
    // Render tabItems--All
    if(tabItems[0].classList.contains('active')){
        list.innerHTML = '';
        todolists.forEach ((todolist) => {
            if (todolist.check == false){
                const createLi = document.createElement('li');
                const createLabel = document.createElement('label');
                const createInput = document.createElement('input');
                const createSpan = document.createElement('span');
                const createA = document.createElement('a');
                createLi.classList.add('list_item');
                createLabel.classList.add('checkbox');
                createA.classList.add('delete');
                createInput.type = 'checkbox';
                createInput.name = 'checkbox';
                createSpan.innerText = todolist.content;
                createA.href = '#';
                createLabel.appendChild(createInput);
                createLabel.appendChild(createSpan);
                createLi.appendChild(createLabel);
                createLi.appendChild(createA);
                list.appendChild(createLi);
            }else{
                const createLi = document.createElement('li');
                const createLabel = document.createElement('label');
                const createInput = document.createElement('input');
                const createSpan = document.createElement('span');
                const createA = document.createElement('a');
                createLi.classList.add('list_item');
                createLabel.classList.add('checkbox');
                createA.classList.add('delete');
                createInput.checked = true;
                createInput.type = 'checkbox';
                createInput.name = 'checkbox';
                createSpan.innerText = todolist.content;
                createA.href = '#';
                createLabel.appendChild(createInput);
                createLabel.appendChild(createSpan);
                createLi.appendChild(createLabel);
                createLi.appendChild(createA);
                list.appendChild(createLi);
            }
        });
        const listItem = document.querySelectorAll('.list_item');
        taskRemain.innerText = `總共 ${listItem.length} 個項目`;

    // Render tabItems--Unchecked
    }else if(tabItems[1].classList.contains('active')){
        list.innerHTML = '';
        todolists.forEach ((todolist) => {
            if (todolist.check == false){
                const createLi = document.createElement('li');
                const createLabel = document.createElement('label');
                const createInput = document.createElement('input');
                const createSpan = document.createElement('span');
                const createA = document.createElement('a');
                createLi.classList.add('list_item');
                createLabel.classList.add('checkbox');
                createA.classList.add('delete');
                createInput.type = 'checkbox';
                createInput.name = 'checkbox';
                createSpan.innerText = todolist.content;
                createA.href = '#';
                createLabel.appendChild(createInput);
                createLabel.appendChild(createSpan);
                createLi.appendChild(createLabel);
                createLi.appendChild(createA);
                list.appendChild(createLi);
            }else{
                return
            }
        });
        const listItem = document.querySelectorAll('.list_item');
        taskRemain.innerText = `${listItem.length} 個待完成的項目`;

    // Render tabItems--Checked
    }else{
        list.innerHTML = '';
        todolists.forEach ((todolist) => {
            if (todolist.check == true){
                const createLi = document.createElement('li');
                const createLabel = document.createElement('label');
                const createInput = document.createElement('input');
                const createSpan = document.createElement('span');
                const createA = document.createElement('a');
                createLi.classList.add('list_item');
                createLabel.classList.add('checkbox');
                createA.classList.add('delete');
                createInput.checked = true;
                createInput.type = 'checkbox';
                createInput.name = 'checkbox';
                createSpan.innerText = todolist.content;
                createA.href = '#';
                createLabel.appendChild(createInput);
                createLabel.appendChild(createSpan);
                createLi.appendChild(createLabel);
                createLi.appendChild(createA);
                list.appendChild(createLi);
            }else{
                return
            }
        });
        const listItem = document.querySelectorAll('.list_item');
        taskRemain.innerText = `${listItem.length} 個已完成的項目`;
    }
};

