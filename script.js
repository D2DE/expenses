document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const incomeForm = document.getElementById('incomeForm');

    if (expenseForm) {
        expenseForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addEntryToTable('expensesTable', ['date', 'item', 'amount']);
            expenseForm.reset();
        });
    }

    if (incomeForm) {
        incomeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addEntryToTable('incomeTable', ['date', 'source', 'amount']);
            incomeForm.reset();
        });
    }

    function addEntryToTable(tableId, fieldIds) {
        const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        fieldIds.forEach(function(fieldId) {
            const value = document.getElementById(fieldId).value;
            const cell = newRow.insertCell();
            cell.textContent = value;
        });
    }
});
