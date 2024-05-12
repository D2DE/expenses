document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expenseForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission from reloading the page

        // Retrieve the input values from the form
        const date = document.getElementById('date').value;
        const item = document.getElementById('item').value;
        const amount = parseFloat(document.getElementById('amount').value).toFixed(2); // Format the amount to two decimal places

        // Insert the new expense into the table
        const table = document.getElementById('expensesTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow(); // Create a new row
        const cell1 = newRow.insertCell(0); // Create a new cell for the date
        const cell2 = newRow.insertCell(1); // Create a new cell for the item
        const cell3 = newRow.insertCell(2); // Create a new cell for the amount

        // Assign the values to the cells
        cell1.textContent = date;
        cell2.textContent = item;
        cell3.textContent = `$${amount}`;

        // Reset the form for new input
        form.reset();
    });
});
