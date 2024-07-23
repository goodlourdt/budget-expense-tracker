document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (name && amount > 0) {
        addExpense(name, amount);
        updateTotal();
        document.getElementById('expense-form').reset();
    } else {
        alert('Please enter a valid name and amount.');
    }
});

let expenses = [];

function addExpense(name, amount) {
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount
    };
    expenses.push(expense);
    renderExpenses();
}

function renderExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - $${expense.amount.toFixed(2)}
            <button onclick="removeExpense(${expense.id})">Remove</button>
        `;
        expenseList.appendChild(li);
    });
}

function removeExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    renderExpenses();
    updateTotal();
}

function updateTotal() {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}
