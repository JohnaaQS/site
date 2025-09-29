async function fetchWindData() {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/winddata"); // Pas de URL aan indien nodig
        const data = await response.json();
        updateTable(data);
    } catch (error) {
        console.error("Fout bij ophalen van winddata:", error);
    }
}

function updateTable(data) {
    const tableBody = document.getElementById("winddata-body");
    tableBody.innerHTML = "";

    data.forEach(row => {
        const tr = document.createElement("tr");
        Object.values(row).forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

setInterval(fetchWindData, 300000); // Ververs elke 5 minuten (300000 ms)
fetchWindData();
