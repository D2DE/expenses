document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
       apiKey: "AIzaSyDtgSfrxjEzlXan_Z2pNjxpNQFYnqJIpyY",
        authDomain: "day-to-day-expenditure-3df6f.firebaseapp.com",
        projectId: "day-to-day-expenditure-3df6f",
        storageBucket: "day-to-day-expenditure-3df6f.appspot.com",
        messagingSenderId: "1064548864669",
        appId: "1:1064548864669:web:3c4cc94c5d3388523d3a74"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.database();

    const provider = new firebase.auth.GoogleAuthProvider();
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function() {
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Handle the result.
            const user = result.user;
            console.log('User signed in: ', user.displayName);
        }).catch((error) => {
            console.error('Sign in error', error.code, error.message);
        });
    });

    // Rest of your script for expenses...
});

    const expenseForm = document.getElementById('expenseForm');

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    function addEntryToTable(tableId, fieldIds) {
        const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        const entry = {};
        fieldIds.forEach(function(fieldId) {
            let value = document.getElementById(fieldId).value;
            if (fieldId === 'date') {
                value = formatDate(value);
            }
            const cell = newRow.insertCell();
            cell.textContent = value;
            entry[fieldId] = value;
        });
        db.ref(tableId).push(entry);
    }

    function generatePDF(tableId, reportTitle, fileName) {
        const doc = new jsPDF();
        doc.text(reportTitle, 14, 16);
        autoTable(doc, {
            html: `#${tableId}`,
            startY: 20,
            theme: 'striped',
            tableWidth: 'auto'
        });
        doc.save(fileName);
    }

    function generateExcel() {
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
