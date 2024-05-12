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
            }
            const cell = newRow.insertCell();
            cell.textContent = value;
        });
    }

    function generatePDF(tableId, reportTitle, fileName) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text(reportTitle, 14, 16);
        doc.autoTable({
            html: `#${tableId}`,
            startY: 20,
            theme: 'striped',
            tableWidth: 'auto'
        });

        doc.save(fileName);
    }

    if (expenseForm) {
        expenseForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addEntryToTable('expensesTable', ['date', 'item', 'amount']);
            expenseForm.reset();
        });
        document.getElementById('saveExpensesPdf').addEventListener('click', function() {
            generatePDF('expensesTable', 'Expenses Report', 'expenses-report.pdf');
        });
    }

    if (incomeForm) {
        incomeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addEntryToTable('incomeTable', ['date', 'source', 'amount']);
            incomeForm.reset();
        });
        document.getElementById('saveIncomePdf').addEventListener('click', function() {
            generatePDF('incomeTable', 'Income Report', 'income-report.pdf');
        });
    }

    // Add event listener for "Save as PDF" button in expenses.html
    const saveExpensesPdfButton = document.getElementById('saveExpensesPdf');
    if (saveExpensesPdfButton) {
        saveExpensesPdfButton.addEventListener('click', function() {
            generatePDF('expensesTable', 'Expenses Report', 'expenses-report.pdf');
        });
    }

    // Add event listener for "Save as PDF" button in income.html
    const saveIncomePdfButton = document.getElementById('saveIncomePdf');
    if (saveIncomePdfButton) {
        saveIncomePdfButton.addEventListener('click', function() {
            generatePDF('incomeTable', 'Income Report', 'income-report.pdf');
        });
    }
});
