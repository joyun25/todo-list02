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
let todolists;
if(localStorage.getItem('todolists') === null){
    todolists = [];
}else{
    todolists = JSON.parse(localStorage.getItem('todolists'));
}

// Reset
renderData();

// Add Todolist
btnAdd.addEventListener('click', addTodo);
function addTodo() {
    if(txt.value.trim() == "") {
        alert('請輸入內容');
        return;
    }else{
        let todolist = {
            content: txt.value,
            check: false
        };
        todolists.push(todolist);
        localStorage.setItem('todolists', JSON.stringify(todolists));
        renderData();
        txt.value = "";
    }
};

// Press Key Enter
txt.addEventListener('keypress', e => {
    if(e.key == 'Enter') {
        addTodo();
    }
});

// Delete Todolist
list.addEventListener('click', e => {
    if(e.target.getAttribute("class") !== "delete"){
        return;
    }else{
        let todoIndex = e.target.closest('li').dataset.num;
        todolists.splice(todoIndex, 1);
        localStorage.setItem('todolists', JSON.stringify(todolists));
        renderData();
    }
});

// Delete tabItems--Checked
taskOrganize.addEventListener('click', () => {
    let deleteChecked = confirm('您確定要刪除所有已完成的項目嗎？')
    if(deleteChecked == true) {
        todolists = todolists.filter((todolist) => todolist.check == false);
        renderData();
    }else{
        return
    }
});

// Check Toggle
list.addEventListener('click', e => {
    if(e.target.name !== 'checkbox'){
        return
    }else{
        let todoIndex = e.target.closest('li').dataset.num;
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
        todolists.forEach ((todolist, index) => {
            if (todolist.check == false){
                const createLi = document.createElement('li');
                const createLabel = document.createElement('label');
                const createInput = document.createElement('input');
                const createSpan = document.createElement('span');
                const createA = document.createElement('a');
                createLi.dataset.num = index;
                createLi.classList.add('list_item');
                createLabel.classList.add('checkbox');
                createA.classList.add('delete');
                createInput.type = 'checkbox';
                createInput.name = 'checkbox';
                createSpan.textContent = todolist.content;
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
                createLi.dataset.num = index;
                createLi.classList.add('list_item');
                createLabel.classList.add('checkbox');
                createA.classList.add('delete');
                createInput.checked = true;
                createInput.type = 'checkbox';
                createInput.name = 'checkbox';
                createSpan.textContent = todolist.content;
                createA.href = '#';
                createLabel.appendChild(createInput);
                createLabel.appendChild(createSpan);
                createLi.appendChild(createLabel);
                createLi.appendChild(createA);
                list.appendChild(createLi);
            }
        });
        const listItem = document.querySelectorAll('.list_item');
        taskRemain.textContent = `總共 ${listItem.length} 個項目`;

    // Render tabItems--Unchecked
    }else if(tabItems[1].classList.contains('active')){
        list.innerHTML = '';
        todolists.forEach ((todolist, index) => {
            if (todolist.check == false){
                const createLi = document.createElement('li');
                const createLabel = document.createElement('label');
                const createInput = document.createElement('input');
                const createSpan = document.createElement('span');
                const createA = document.createElement('a');
                createLi.dataset.num = index;
                createLi.classList.add('list_item');
                createLabel.classList.add('checkbox');
                createA.classList.add('delete');
                createInput.type = 'checkbox';
                createInput.name = 'checkbox';
                createSpan.textContent = todolist.content;
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
        taskRemain.textContent = `${listItem.length} 個待完成的項目`;

    // Render tabItems--Checked
    }else{
        list.innerHTML = '';
        todolists.forEach ((todolist, index) => {
            if (todolist.check == true){
                const createLi = document.createElement('li');
                const createLabel = document.createElement('label');
                const createInput = document.createElement('input');
                const createSpan = document.createElement('span');
                const createA = document.createElement('a');
                createLi.dataset.num = index;
                createLi.classList.add('list_item');
                createLabel.classList.add('checkbox');
                createA.classList.add('delete');
                createInput.checked = true;
                createInput.type = 'checkbox';
                createInput.name = 'checkbox';
                createSpan.textContent = todolist.content;
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
        taskRemain.textContent = `${listItem.length} 個已完成的項目`;
    }
};

