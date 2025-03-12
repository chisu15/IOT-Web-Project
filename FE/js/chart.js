const ctx = document.getElementById('realtimeChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            { label: 'Nhiệt độ', data: [], borderColor: 'red', fill: false },
            { label: 'Độ ẩm', data: [], borderColor: 'blue', fill: false },
            { label: 'Ánh sáng', data: [], borderColor: 'green', fill: false }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { display: true },
            y: { display: true }
        }
    }
});

function updateChartData() {
    const newTemp = Math.floor(Math.random() * 100);
    const newHumidity = Math.floor(Math.random() * 100);
    const newLight = Math.floor(Math.random() * 100);
    
    if (chart.data.labels.length > 10) {
        chart.data.labels.shift();
        chart.data.datasets.forEach(dataset => dataset.data.shift());
    }
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(newTemp);
    chart.data.datasets[1].data.push(newHumidity);
    chart.data.datasets[2].data.push(newLight);
    chart.update();
}
setInterval(updateChartData, 2000);