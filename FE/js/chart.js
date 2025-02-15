document.addEventListener("DOMContentLoaded", function () {
    const ctx1 = document.getElementById("deviceChart").getContext("2d");
    new Chart(ctx1, {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            datasets: [{
                label: "Active Devices",
                data: [10, 15, 12, 18, 22],
                borderColor: "#007bff",
                fill: false
            }]
        }
    });

    const ctx2 = document.getElementById("referralsChart").getContext("2d");
    new Chart(ctx2, {
        type: "bar",
        data: {
            labels: ["Facebook", "Twitter", "Google"],
            datasets: [{
                label: "Referrals",
                data: [2301, 2107, 2308],
                backgroundColor: ["#007bff", "#6f42c1", "#28a745"]
            }]
        }
    });
});
