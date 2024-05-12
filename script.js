document.addEventListener('DOMContentLoaded', function() {
    // Check if elements exist to prevent errors on pages without these forms
    const expenseForm = document.getElementById('expenseForm');
    const incomeForm = document.getElementById('incomeForm');
    const loginButton = document.getElementById('loginButton');

    // Function definitions remain the same...

    // Conditional checks for the presence of forms and buttons
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
            generateExcel('expensesTable', 'expenses-report.xlsx');
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

        document.getElementById('saveIncomeExcel').addEventListener('click', function() {
            generateExcel('incomeTable', 'income-report.xlsx');
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', function() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // Handle login success
                console.log("Logged in as:", result.user.displayName);
            }).catch(function(error) {
                // Handle Errors here.
                console.error("Authentication error:", error.message);
            });
        });
    }
});
