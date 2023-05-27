
function saveToLocalStorage(event) {
    event.preventDefault();
    const expenseAmount = event.target.expenseAmount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    localStorage.setItem('expenseAmount', expenseAmount);
    localStorage.setItem('description', description);
    localStorage.setItem('category', category);
    const obj = {
        expenseAmount: expenseAmount,
        description: description,
        category: category
    };
    localStorage.setItem('expenseDetails', JSON.stringify(obj));
    showExpenseOnScreen(obj);
}

function showExpenseOnScreen(obj) {
    const parentElem = document.getElementById('listOfitems');
    const liElem = document.createElement("li");
    liElem.innerHTML = `
        <span>${obj.expenseAmount} - ${obj.description} - ${obj.category}</span>
        <button onclick="editExpense(event)">Edit</button>
        <button onclick="removeExpense(event)">Delete</button>
    `;
    parentElem.appendChild(liElem);
}

function removeExpense(event) {
    const liElem = event.target.parentNode;
    const expenseAmount = liElem.textContent.split(" - ")[0];
    const description = liElem.textContent.split(" - ")[1];
    const category = liElem.textContent.split(" - ")[2];
    const obj = {
        expenseAmount: expenseAmount,
        description: description,
        category: category
    };
    localStorage.removeItem('expenseDetails', JSON.stringify(obj));
    liElem.remove();
}

function editExpense(event) {
    const liElem = event.target.parentNode;
    const spanElem = liElem.querySelector('span');
    const expenseAmount = spanElem.textContent.split(" - ")[0];
    const description = spanElem.textContent.split(" - ")[1];
    const category = spanElem.textContent.split(" - ")[2];
    const obj = {
        expenseAmount: expenseAmount,
        description: description,
        category: category
    };
    localStorage.removeItem('expenseDetails', JSON.stringify(obj));
    event.target.innerText = "Save";
    event.target.onclick = saveEditedExpense;
    spanElem.innerHTML = `
        <input type="text" name="editExpenseAmount" value="${expenseAmount}" required/>
        <input type="text" name="editDescription" value="${description}" required/>
        <input type="text" name="editCategory" value="${category}" required/>
    `;
}

function saveEditedExpense(event) {
    const liElem = event.target.parentNode;
    const spanElem = liElem.querySelector('span');
    const editExpenseAmount = liElem.querySelector('input[name="editExpenseAmount"]').value;
    const editDescription = liElem.querySelector('input[name="editDescription"]').value;
    const editCategory = liElem.querySelector('input[name="editCategory"]').value;
    const obj = {
        expenseAmount: editExpenseAmount,
        description: editDescription,
        category: editCategory
    };
    localStorage.setItem('expenseDetails', JSON.stringify(obj));
    event.target.innerText = "Edit";
    event.target.onclick = editExpense;
    spanElem.innerHTML = `
        ${editExpenseAmount} - ${editDescription} - ${editCategory}
    `;
}


