document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const incomeForm = document.getElementById('incomeForm');

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
        fieldIds.forEach(function(fieldId) {
            let value = document.getElementById(fieldId).value;
            if (fieldId === 'date') {
                value = formatDate(value);
            }
            const cell = newRow.insertCell();
            cell.textContent = value;
        });
    }
    function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}
    function writeUserData(userId, transaction) {
  firebase.database().ref('users/' + userId + '/transactions').push().set({
    transactionData: transaction
  });
}

function readUserData(userId) {
  var transactionsRef = firebase.database().ref('users/' + userId + '/transactions');
  transactionsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      // use childData as needed
    });
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

    function generateExcel(tableId, fileName) {
        // Logic for generating Excel file
        // This feature is not implemented yet
        alert("Save as Excel feature coming soon!");
    }
    function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
<script>
  // Assuming Firebase is already initialized above this script

  document.getElementById('loginButton').addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // You can save the user data here or do some actions
      alert("Logged in as: " + user.displayName);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // You could also implement error handling
      alert("Failed to login: " + errorMessage);
    });
  });
</script>
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
});
