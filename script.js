document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2); // Add leading zero and slice last two digits
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed, add leading zero
        const year = date.getFullYear();
        return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
    }

    function addEntryToTable(tableId, fieldIds) {
        const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        fieldIds.forEach(function(fieldId) {
            let value = document.getElementById(fieldId).value;
            if (fieldId === 'date') { // Check if the field is a date
                value = formatDate(value); // Format the date
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

    function generateExcel() {
        // Logic for generating Excel file
        // This feature is not implemented yet
        alert("Save as Excel feature coming soon!");
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

        document.getElementById('saveExpensesExcel').addEventListener('click', function() {
            generateExcel();
        });
    }
});
