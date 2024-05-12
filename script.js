document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');

    // Your Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDtgSfrxjEzlXan_Z2pNjxpNQFYnqJIpyY",
  authDomain: "day-to-day-expenditure-3df6f.firebaseapp.com",
  projectId: "day-to-day-expenditure-3df6f",
  storageBucket: "day-to-day-expenditure-3df6f.appspot.com",
  messagingSenderId: "1064548864669",
  appId: "1:1064548864669:web:3c4cc94c5d3388523d3a74"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.database();

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
        const entry = {};
        fieldIds.forEach(function(fieldId) {
            let value = document.getElementById(fieldId).value;
            if (fieldId === 'date') { // Check if the field is a date
                value = formatDate(value); // Format the date
            }
            const cell = newRow.insertCell();
            cell.textContent = value;
            entry[fieldId] = value;
        });
        // Add the entry to Firebase database
        db.ref(tableId).push(entry);
    }

    function generatePDF(tableId, reportTitle, fileName) {
        const doc = new jsPDF(); // Directly use jsPDF
        doc.text(reportTitle, 14, 16);
        doc.autoTable({
            html: `#${tableId}`, // Select table by ID
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
