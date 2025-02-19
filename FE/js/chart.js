const ctx = document.getElementById('realtimeChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dữ liệu cảm biến',
            data: [],
            borderColor: 'blue',
            fill: false,
        }]
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
    const newData = Math.floor(Math.random() * 100);
    if (chart.data.labels.length > 10) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(newData);
    chart.update();
}
setInterval(updateChartData, 2000);