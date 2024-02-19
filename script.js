let todos = [];

// HANDLE AND FORM
const addInputNode = document.querySelector("#addInput");
const addFormNode = document.querySelector("#addForm");
addFormNode.addEventListener("submit", (event) => {
  event.preventDefault();
  if (addInputNode.value) {
    addTodo(addInputNode.value);
    addInputNode.value = "";
  }
});

function addTodo(addedValue) {
  const newTodo = {
    id: Date.now(),
    label: addedValue,
    isDone: false,
  };
  todos.unshift(newTodo);
  renderTodos();
}

// HANDLE RENDER
function renderTodos() {
  
  const todoListNode = document.querySelector("#todoList");
  todoListNode.innerHTML = "";
  
  todos.forEach((todo) => {
    // this is todo-item's keys
    const { id, label, isDone, isEditting } = todo || {};

    // todoItemNode: wrap toto-item content
    const todoItemNode = document.createElement("li");
    todoItemNode.className = `todo-item ${isDone ? "done" : ""}`;
    todoItemNode.id = id;

    // labelNode: render todo-item label
    const labelNode = document.createElement("span");
    labelNode.className = "todo-label";
    labelNode.innerText = label;

    // actionNode: wrap todo-item actions
    const actionNode = document.createElement("div");
    actionNode.className = "todo-action";

    // deleteBtnNode: button handle delete action
    const deleteBtnNode = document.createElement("button");
    deleteBtnNode.className = "btn btn-delete";
    deleteBtnNode.innerText = "Delete";
    deleteBtnNode.addEventListener("click", (event) => {
      event.preventDefault();
      deleteTodo(id);
    });

    // editBtnNode: button handle edit action
    const editBtnNode = document.createElement("button");
    editBtnNode.className = "btn btn-edit";
    editBtnNode.innerText = "Edit";
    editBtnNode.addEventListener("click", (event) => {
      event.preventDefault();
      toggleEditView(id);
    });

    // doneBtnNode: button handle done action
    const doneBtnNode = document.createElement("button");
    doneBtnNode.className = "btn btn-done";
    doneBtnNode.innerText = isDone ? "Undone" : "Done";
    doneBtnNode.addEventListener("click", (event) => {
      event.preventDefault();
      updateTodoStatus(id);
    });

    // editInputNode: input handle get user edited-label
    const editInputNode = document.createElement("input");
    editInputNode.className = "input editInput";
    editInputNode.value = label;

    // saveBtnNode: button handle save user edited-label
    const saveBtnNode = document.createElement("button");
    saveBtnNode.className = "btn";
    saveBtnNode.innerText = "Save";

    // editFormNode: form cover & handle submit edited-label
    const editFormNode = document.createElement("form");
    editFormNode.className = "form editForm";
    editFormNode.addEventListener("submit", (event) => {
      event.preventDefault();
      if (editInputNode.value) {
        updateTodoLabel(id, editInputNode.value);
        toggleEditView(id);
        editInputNode.value = "";
      }
    });

    // if "isEditting" true, render edit view with editFormNode
    if (isEditting) {
      editFormNode.appendChild(editInputNode);
      editFormNode.appendChild(saveBtnNode);

      todoItemNode.appendChild(editFormNode);
    }
    // if "isEditting" false, render info view with labelNode & actionNode
    else {
      actionNode.appendChild(deleteBtnNode);
      !isDone && actionNode.appendChild(editBtnNode);
      actionNode.appendChild(doneBtnNode);

      todoItemNode.appendChild(labelNode);
      todoItemNode.appendChild(actionNode);
    }

    // add this todoItemNode into todoListNode
    todoListNode.appendChild(todoItemNode);
  });
}
/*-----------------------*/

/*--- FUNCTIONS ---*/
/**
 * handle delete todo item by id
 * @param {*} id
 */
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

/**
 * handle update todo item's status
 * @param {*} id
 */
function updateTodoStatus(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
  );
  renderTodos();
}

/**
 * handle toggle todo item's edit view
 * @param {*} id
 */
function toggleEditView(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, isEditting: !todo.isEditting } : todo
  );
  renderTodos();
}

/**
 * handle update todo item's label
 * @param {*} id
 * @param {*} editedLabel
 */
function updateTodoLabel(id, editedLabel) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, label: editedLabel } : todo
  );
  renderTodos();
}