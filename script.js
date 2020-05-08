const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')


function newTodo() {
  // Intialize variables
  let text = prompt("What do you want to add to the TODO list?");
  let li = document.createElement('li');
  let p = document.createElement('span');
  let checkbox = document.createElement('input');
  let textNode = document.createTextNode(text);
  checkbox.type = "checkbox";
  checkbox.style.margin = "10px";
  checkbox.onclick = (event) => { this.todoDone(event) }
  li.className = classNames.TODO_ITEM;
  p.className = classNames.TODO_TEXT;

  // Build tree
  p.appendChild(checkbox)
  p.appendChild(textNode)
  li.appendChild(p)
  list.appendChild(li)

  // Update counts
  let currentItemCount = Number(itemCountSpan.innerHTML);
  let currentUncheckedItemCount = Number(uncheckedCountSpan.innerHTML);
  currentItemCount++;
  currentUncheckedItemCount++;

  // Refresh the number of counts on page
  itemCountSpan.innerHTML = currentItemCount;
  uncheckedCountSpan.innerHTML = currentUncheckedItemCount;
}

function todoDone(event) {
  let currentUncheckedItemCount = Number(uncheckedCountSpan.innerHTML);
  let box = event.target;
  if (box.checked) {
    currentUncheckedItemCount--;
  }
  else {
    currentUncheckedItemCount++;
  }
  uncheckedCountSpan.innerHTML = currentUncheckedItemCount;
}