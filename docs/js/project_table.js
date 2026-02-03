const columnConfig = [
    {key: 'name', header: 'Name'},
    {key: 'lang', header: 'Language'},
    {key: 'descr', header: 'Description'},
]

function loadTable() {
    const container = document.getElementById('project-table');
    if (!container) return;

    container.innerHTML = '';
    fetch('../projects_db.json')
        .then(response => response.json())
        .then(data => {
            // Create empty table: Headers + rows
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            columnConfig.forEach(col => {
                const th = document.createElement('th');
                th.textContent = col.header;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create the body of the table:
            const tbody = document.createElement('tbody');
            data.forEach(projectData => {
                const row = document.createElement('tr');
                columnConfig.forEach(col => {
                    const cell = document.createElement('td');
                    cell.textContent = projectData[col.key];
                    row.appendChild(cell);
                })

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            container.appendChild(table);
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            container.textContent = 'Error loading projects data.';
        });
}

document.addEventListener('DOMContentLoaded', function() {
    loadTable();
});

document$.subscribe(function () {
    loadTable();
});