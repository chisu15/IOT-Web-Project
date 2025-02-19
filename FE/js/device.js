document.addEventListener("DOMContentLoaded", function () {
    const sensorData = [
        { id: 1, temp: 25, humidity: 60, light: 300, time: "20/02/2024 14:30:00" },
        { id: 2, temp: 27, humidity: 55, light: 400, time: "20/02/2024 14:31:00" },
        { id: 3, temp: 24, humidity: 65, light: 250, time: "20/02/2024 14:32:00" },
        { id: 4, temp: 26, humidity: 58, light: 350, time: "20/02/2024 14:33:00" },
        { id: 5, temp: 29, humidity: 50, light: 450, time: "20/02/2024 14:34:00" },
        { id: 6, temp: 22, humidity: 70, light: 200, time: "20/02/2024 14:35:00" },
        { id: 7, temp: 28, humidity: 57, light: 370, time: "20/02/2024 14:36:00" },
        { id: 8, temp: 23, humidity: 66, light: 280, time: "20/02/2024 14:37:00" }
    ];

    let filteredData = [...sensorData];
    let currentPage = 1;
    let pageSize = 5;

    const tableBody = document.getElementById("sensorTable");
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const pageSizeSelect = document.getElementById("pageSizeSelect");
    const pagination = document.getElementById("pagination");

    function renderTable(data) {
        tableBody.innerHTML = "";
        let start = (currentPage - 1) * pageSize;
        let end = start + pageSize;
        let paginatedData = data.slice(start, end);

        let rowCount = paginatedData.length;
        for (let i = 0; i < pageSize; i++) {
            if (i < rowCount) {
                let sensor = paginatedData[i];
                const row = `
                    <tr>
                        <td>${sensor.id}</td>
                        <td>${sensor.temp}°C</td>
                        <td>${sensor.humidity}%</td>
                        <td>${sensor.light} lx</td>
                        <td>${sensor.time}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            } else {
                tableBody.innerHTML += `<tr><td colspan="5">&nbsp;</td></tr>`;
            }
        }

        renderPagination(data.length);
    }

    function renderPagination(totalItems) {
        pagination.innerHTML = "";
        let totalPages = Math.ceil(totalItems / pageSize);
        if (totalPages < 1) totalPages = 1;

        for (let i = 1; i <= totalPages; i++) {
            let li = document.createElement("li");
            li.className = `page-item ${i === currentPage ? "active" : ""}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener("click", function () {
                currentPage = i;
                renderTable(filteredData);
            });
            pagination.appendChild(li);
        }
    }

    // Tìm kiếm chỉ khi nhấn nút "Tìm kiếm"
    window.searchSensor = function () {
        let searchText = searchInput.value.toLowerCase().trim();
        
        filteredData = sensorData.filter(sensor => {
            return (
                sensor.id.toString().includes(searchText) ||
                sensor.temp.toString().includes(searchText) ||
                sensor.humidity.toString().includes(searchText) ||
                sensor.light.toString().includes(searchText) ||
                sensor.time.includes(searchText)
            );
        });

        currentPage = 1;
        renderTable(filteredData);
    };

    // Áp dụng chỉ khi nhấn nút "Áp dụng"
    window.applyFilters = function () {
        pageSize = parseInt(pageSizeSelect.value);

        if (sortSelect.value === "desc") {
            filteredData.sort((a, b) => new Date(b.time) - new Date(a.time));
        } else {
            filteredData.sort((a, b) => new Date(a.time) - new Date(b.time));
        }

        currentPage = 1;
        renderTable(filteredData);
    };

    window.resetFilters = function () {
        searchInput.value = "";
        sortSelect.value = "asc";
        pageSize = 5;
        pageSizeSelect.value = "5";
        filteredData = [...sensorData];
        currentPage = 1;
        renderTable(filteredData);
    };

    renderTable(sensorData);
});
