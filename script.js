document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const expensesTable = document.getElementById('expensesTable');

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    function addExpenseToTable(date, item, amount) {
        const newRow = expensesTable.insertRow();
        const dateCell = newRow.insertCell();
        const itemCell = newRow.insertCell();
        const amountCell = newRow.insertCell();

        dateCell.textContent = formatDate(date);
        itemCell.textContent = item;
        amountCell.textContent = amount;
    }

    function generatePDF() {
        // Placeholder for generating PDF
        alert('Generating PDF...');
    }

    function generateExcel() {
        // Placeholder for generating Excel
        alert('Generating Excel...');
    }

    if (expenseForm) {
        expenseForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const date = expenseForm.elements.date.value;
            const item = expenseForm.elements.item.value;
            const amount = expenseForm.elements.amount.value;
            addExpenseToTable(date, item, amount);
            expenseForm.reset();
        });
    }

    const saveExpensesPdfButton = document.getElementById('saveExpensesPdf');
    if (saveExpensesPdfButton) {
        saveExpensesPdfButton.addEventListener('click', function() {
            generatePDF();
        });
    }

    const saveExpensesExcelButton = document.getElementById('saveExpensesExcel');
    if (saveExpensesExcelButton) {
        saveExpensesExcelButton.addEventListener('click', function() {
            generateExcel();
        });
    }
});
