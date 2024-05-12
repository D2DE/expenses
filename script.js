document.addEventListener('DOMContentLoaded', function() {
    // Function to generate Excel file
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
        document.body.removeChild(link); // Clean up the dynamically created link element
    }

    // Add event listener for "Save as Excel" button
    const saveAsExcelButton = document.getElementById('saveExpensesExcel');
    saveAsExcelButton.addEventListener('click', function() {
        generateExcel('expensesTable', 'expenses_report'); // Update tableId and fileName accordingly
    });
});
