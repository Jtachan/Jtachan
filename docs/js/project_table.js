const columnConfig = [
    {key: 'name', header: 'Name'},
    {key: 'lang', header: 'Language'},
    {key: 'descr', header: 'Description'},
]

const iconExtensions = {
    "Python": "svg",
    "Rust": "png",
}

function getLangIcon(lang) {
    const extension = iconExtensions[lang];

    if (!extension) {
        // No icon mapping found, using original text
        return lang;
    }

    const iconPath = `../assets/code-icons/${lang.toLowerCase()}.${extension}`;

    const img = document.createElement('img');
    img.src = iconPath;
    img.alt = lang;
    img.className = "icon";

    // If image fails to load → fallback to text
    img.onerror = () => {
        img.replaceWith(document.createTextNode(lang));
    };

    return img;
}

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
                const th = document.createElement('th')
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
                    if (col.key === 'lang') {
                        const langContent = getLangIcon(projectData[col.key]);
                        if (typeof langContent === 'string') {
                            cell.textContent = langContent
                        } else {
                            cell.appendChild(langContent);
                        }
                    } else {
                        cell.textContent = projectData[col.key];
                    }
                    row.appendChild(cell);
                })

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            container.appendChild(table);
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            container.textContent = error;
        });
}

document$.subscribe(function () {
    loadTable();
});