document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('budget-form');
    const balanceElement = document.getElementById('balance');
    const recordList = document.getElementById('record-list');
    let balance = 0;
    let weeklyRecords = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const income = parseFloat(document.getElementById('income').value);
        const expense = parseFloat(document.getElementById('expense').value);

        if (!isNaN(income)) {
            balance += income;
        }

        if (!isNaN(expense)) {
            balance -= expense;
        }

        balanceElement.textContent = `$${balance.toFixed(2)}`;
        saveWeeklyRecord(income, expense);
        form.reset();
    });

    function saveWeeklyRecord(income, expense) {
        const date = new Date();
        const record = {
            date: date.toLocaleDateString(),
            income: income || 0,
            expense: expense || 0,
            balance: balance
        };
        weeklyRecords.push(record);
        displayWeeklyRecords();
    }

    function displayWeeklyRecords() {
        recordList.innerHTML = '';
        weeklyRecords.forEach(record => {
            const li = document.createElement('li');
            li.textContent = `${record.date} - Income: $${record.income.toFixed(2)}, Expense: $${record.expense.toFixed(2)}, Balance: $${record.balance.toFixed(2)}`;
            recordList.appendChild(li);
        });
    }
});
