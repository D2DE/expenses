document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const incomeForm = document.getElementById('incomeForm');

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
    function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Expenses Report', 14, 16);
    doc.autoTable({
        html: '#expensesTable',
        startY: 20,
        theme: 'striped',
        tableWidth: 'auto'
    });

    doc.save('expenses-report.pdf');
}
            const cell = newRow.insertCell();
            cell.textContent = value;
        });
    }

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
});
