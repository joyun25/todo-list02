// Selectors
const txt = document.querySelector('.txt');
const btnAdd = document.querySelector('.btn_add');
const tab = document.querySelector('.tab');
const tabItems = document.querySelectorAll('.tab_item');
const list = document.querySelector('.list');
const taskRemain = document.querySelector('.task_remain');
const taskOrganize = document.querySelector('.task_organize');

// Set Up LocalStorage
var todos;
if(localStorage.getItem('todos') === null){
    todos = [];
}else{
    todos = JSON.parse(localStorage.getItem('todos'));
    renderData();
}

// Add Todo
btnAdd.addEventListener('click', ()=>{
    if(txt.value == "") {
        alert('請輸入內容');
        return;
    }else{
        let todo = {};
        todo.content = txt.value;
        todo.check = false;
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderData();
        txt.value = "";
    }
});

// Delete Todo
list.addEventListener('click', e => {
    if(e.target.getAttribute("class") !== "delete"){
        return;
    }else{
        const todoText = e.target.parentElement.children[0].innerText;
        todos.splice(todos.map(x => x.content).indexOf(todoText), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderData();
    }
});

// Delete tabItems--Checked
taskOrganize.addEventListener('click', () => {
    let deleteChecked = confirm('您確定要刪除所有已完成的項目嗎？')
    if(deleteChecked == true) {
        todos.forEach(todo => {
            if(todo.check == true){
                const todoText = todo.content;
                todos.splice(todos.map(x => x.content).indexOf(todoText), 1);
                localStorage.setItem('todos', JSON.stringify(todos));
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
        const todoIndex = todos.map(x => x.content).indexOf(todoText);
        if(todos[todoIndex].check == false) {
            todos[todoIndex].check = true;
        }else{
            todos[todoIndex].check = false;
        }
        localStorage.setItem('todos', JSON.stringify(todos));
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
    // Render tabItems--All
    if(tabItems[0].classList.contains('active')){
        let str = "";
        todos.forEach ((todo) => {
            if (todo.check == false){
                str += `
                    <li class="list_item">
                        <label for="" class="checkbox">
                            <input type="checkbox" name="checkbox" id="">
                            <span>${todo.content}</span>
                        </label>
                        <a href="#" class="delete"></a>
                    </li>
                `
            }else{
                str += `
                    <li class="list_item">
                        <label for="" class="checkbox">
                            <input type="checkbox" name="checkbox" id="" checked>
                            <span>${todo.content}</span>
                        </label>
                        <a href="#" class="delete"></a>
                    </li>
                `
            }
        });
        list.innerHTML = str;
        const listItem = document.querySelectorAll('.list_item');
        taskRemain.innerHTML = `總共 ${listItem.length} 個項目`;

    // Render tabItems--Unchecked
    }else if(tabItems[1].classList.contains('active')){
        let str = "";
        todos.forEach ((todo) => {
            if (todo.check == false){
                str += `
                    <li class="list_item">
                        <label for="" class="checkbox">
                            <input type="checkbox" name="checkbox" id="">
                            <span>${todo.content}</span>
                        </label>
                        <a href="#" class="delete"></a>
                    </li>
                `
            }else{
                return
            }
        });
        list.innerHTML = str;
        const listItem = document.querySelectorAll('.list_item');
        taskRemain.innerHTML = `${listItem.length} 個待完成的項目`;

    // Render tabItems--Checked
    }else{
        let str = "";
        todos.forEach ((todo) => {
            if (todo.check == true){
                str += `
                    <li class="list_item">
                        <label for="" class="checkbox">
                            <input type="checkbox" name="checkbox" id="" checked>
                            <span>${todo.content}</span>
                        </label>
                        <a href="#" class="delete"></a>
                    </li>
                `
            }else{
                return
            }
        });
        list.innerHTML = str;
        const listItem = document.querySelectorAll('.list_item');
        taskRemain.innerHTML = `${listItem.length} 個已完成的項目`;
    }
};

