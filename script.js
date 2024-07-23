document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('budget-form');
    const balanceElement = document.getElementById('balance');
    const recordList = document.getElementById('record-list');
    let balance = 0;
    let weeklyRecords = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const incomeLabel = document.getElementById('income-label').value;
        const income = parseFloat(document.getElementById('income').value);
        const expenseLabel = document.getElementById('expense-label').value;
        const expense = parseFloat(document.getElementById('expense').value);
        const date = document.getElementById('date').value;

        if (!isNaN(income)) {
            balance += income;
        }

        if (!isNaN(expense)) {
            balance -= expense;
        }

        balanceElement.textContent = `$${balance.toFixed(2)}`;
        saveWeeklyRecord(incomeLabel, income, expenseLabel, expense, date);
        form.reset();
    });

    function saveWeeklyRecord(incomeLabel, income, expenseLabel, expense, date) {
        const record = {
            date: new Date(date).toLocaleDateString(),
            incomeLabel: incomeLabel || 'Income',
            income: income || 0,
            expenseLabel: expenseLabel || 'Expense',
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
            li.textContent = `${record.date} - ${record.incomeLabel}: $${record.income.toFixed(2)}, ${record.expenseLabel}: $${record.expense.toFixed(2)}, Balance: $${record.balance.toFixed(2)}`;
            recordList.appendChild(li);
        });
    }
});
