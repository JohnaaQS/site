const csvUrl = "https://raw.githubusercontent.com/JohnaaQS/ICT-projecten/main/Programma/weather_data.csv";
 
async function fetchData() {
    const response = await fetch(csvUrl);
    const data = await response.text();
 
    const rows = data.split("\n").slice(1); // Eerste rij overslaan (headers)
    const tijdstip = [];
    const tempApparaat = [];
    const tempOmgeving = [];
    const windsnelheid = [];
 
    rows.forEach(row => {
        const columns = row.split(",");
        if (columns.length > 4) {
            const tijd = columns[0].trim();
            const apparaatTemp = parseFloat(columns[1].trim());
            const omgevingTemp = parseFloat(columns[2].trim());
            const wind = parseFloat(columns[3].trim());
 
            if (!isNaN(apparaatTemp) && !isNaN(omgevingTemp) && !isNaN(wind)) {
                tijdstip.push(tijd);
                tempApparaat.push(apparaatTemp);
                tempOmgeving.push(omgevingTemp);
                windsnelheid.push(wind);
            }
        }
    });
 
    return { tijdstip, tempApparaat, tempOmgeving, windsnelheid };
}
 
async function renderCharts() {
    const data = await fetchData();
 
    const ctxTemp = document.getElementById('tempChart').getContext('2d');
    new Chart(ctxTemp, {
        type: 'line',
        data: {
            labels: data.tijdstip,
            datasets: [
                {
                    label: 'Apparaat Temp (°C)',
                    data: data.tempApparaat,
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'Omgeving Temp (°C)',
                    data: data.tempOmgeving,
                    borderColor: 'blue',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
                y: { min: 0, max: 50 }
            }
        }
    });
 
    const ctxWind = document.getElementById('windChart').getContext('2d');
    new Chart(ctxWind, {
        type: 'line',
        data: {
            labels: data.tijdstip,
            datasets: [
                {
                    label: 'Windsnelheid (m/s)',
                    data: data.windsnelheid,
                    borderColor: 'purple',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
                y: { min: 0, max: 20 }
            }
        }
    });
}
 
// Zorg dat de grafieken pas starten als er op de knop wordt gedrukt
document.getElementById("startBtn").addEventListener("click", renderCharts);

 
 