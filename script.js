document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('budget-form');
    const balanceElement = document.getElementById('balance');
    const recordList = document.getElementById('record-list');
    const clearDataButton = document.getElementById('clear-data');
    let balance = 0;
    let weeklyRecords = [];

    // Load data from localStorage
    loadFromLocalStorage();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const incomeLabel = document.getElementById('income-label').value;
        const income = parseFloat(document.getElementById('income').value);
        const expenseLabel = document.getElementById('expense-label').value;
        const expense = parseFloat(document.getElementById('expense').value);
        const date = document.getElementById('date').value;

        if (!isNaN(income) && income > 0) {
            balance += income;
            saveWeeklyRecord(incomeLabel || 'Income', income, date, 'income');
        }

        if (!isNaN(expense) && expense > 0) {
            balance -= expense;
            saveWeeklyRecord(expenseLabel || 'Expense', expense, date, 'expense');
        }

        balanceElement.textContent = `₱${balance.toFixed(2)}`;
        form.reset();
        saveToLocalStorage();
    });

    clearDataButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all data?')) {
            localStorage.removeItem('budgetTrackerData');
            balance = 0;
            weeklyRecords = [];
            balanceElement.textContent = `₱${balance.toFixed(2)}`;
            displayWeeklyRecords();
        }
    });

    function saveWeeklyRecord(label, amount, date, type) {
        const record = {
            date: new Date(date).toLocaleDateString(),
            label: label,
            amount: amount,
            type: type,
            balance: balance
        };
        weeklyRecords.push(record);
        displayWeeklyRecords();
    }

    function displayWeeklyRecords() {
        recordList.innerHTML = '';
        weeklyRecords.forEach(record => {
            const li = document.createElement('li');
            li.textContent = `${record.date} - ${record.label}: ₱${record.amount.toFixed(2)}, Balance: ₱${record.balance.toFixed(2)}`;
            if (record.type === 'income') {
                li.classList.add('income');
            } else {
                li.classList.add('expense');
            }
            recordList.appendChild(li);
        });
    }

    function saveToLocalStorage() {
        const data = {
            balance: balance,
            weeklyRecords: weeklyRecords
        };
        localStorage.setItem('budgetTrackerData', JSON.stringify(data));
    }

    function loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('budgetTrackerData'));
        if (data) {
            balance = data.balance;
            weeklyRecords = data.weeklyRecords;
            balanceElement.textContent = `₱${balance.toFixed(2)}`;
            displayWeeklyRecords();
        }
    }
});
