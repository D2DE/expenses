document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const incomeForm = document.getElementById('incomeForm');

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2);  // Ensures two digits
        const month = ('0' + (date.getMonth() + 1)).slice(-2);  // Corrects zero-indexed month
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;  // Returns date in DD-MM-YYYY format
    }

    function addEntryToTable(tableId, fieldIds) {
        const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        fieldIds.forEach(function(fieldId) {
            let value = document.getElementById(fieldId).value;
            if (fieldId === 'date') {  // Formats date if the field is a date
                value = formatDate(value);
            } else if (fieldId === 'amount') { // Add ₹ symbol next to amount
                value = '₹' + value;
            }
            const cell = newRow.insertCell();
            cell.textContent = value;
        });
    }

    function generatePDF(tableId, reportTitle, fileName) {
        // PDF generation code
    }

    function generateExcel(tableId, fileName) {
        const table = document.getElementById(tableId);
        const rows = table.querySelectorAll('tr');
        const csvData = [];

        rows.forEach(function(row) {
            const rowData = [];
            row.querySelectorAll('td').forEach(function(cell) {
                rowData.push(cell.textContent.trim());
            });
            csvData.push(rowData.join(','));
        });

        const csvContent = 'data:text/csv;charset=utf-8,' + csvData.join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', fileName + '.csv');
        document.body.appendChild(link);
        link.click();
    }

    if (expenseForm) {
        // Event listeners for expense form
    }

    if (incomeForm) {
        // Event listeners for income form
    }

    // Add event listener for "Save as PDF" button in expenses.html
    const saveExpensesPdfButton = document.getElementById('saveExpensesPdf');
    if (saveExpensesPdfButton) {
        saveExpensesPdfButton.addEventListener('click', function() {
            generatePDF('expensesTable', 'Expenses Report', 'expenses-report');
        });
    }

    // Add event listener for "Save as Excel" button in expenses.html
    const saveExpensesExcelButton = document.getElementById('saveExpensesExcel');
    if (saveExpensesExcelButton) {
        saveExpensesExcelButton.addEventListener('click', function() {
            generateExcel('expensesTable', 'expenses-report');
        });
    }

    // Add event listener for "Save as PDF" button in income.html
    const saveIncomePdfButton = document.getElementById('saveIncomePdf');
    if (saveIncomePdfButton) {
        saveIncomePdfButton.addEventListener('click', function() {
            generatePDF('incomeTable', 'Income Report', 'income-report');
        });
    }

    // Add event listener for "Save as Excel" button in income.html
    const saveIncomeExcelButton = document.getElementById('saveIncomeExcel');
    if (saveIncomeExcelButton) {
        saveIncomeExcelButton.addEventListener('click', function() {
            generateExcel('incomeTable', 'income-report');
        });
    }
});
