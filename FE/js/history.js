document.addEventListener("DOMContentLoaded", function () {
    const historyData = [
        { id: 1, device: "Cảm biến nhiệt độ", action: "Đã ghi nhận dữ liệu", time: "20/02/2024 14:30:00" },
        { id: 2, device: "Đèn thông minh", action: "Đã bật", time: "20/02/2024 14:31:00" },
        { id: 3, device: "Máy lọc không khí", action: "Đã tắt", time: "20/02/2024 14:32:00" },
        { id: 4, device: "Quạt trần", action: "Tăng tốc độ", time: "20/02/2024 14:33:00" },
        { id: 5, device: "Camera an ninh", action: "Phát hiện chuyển động", time: "20/02/2024 14:34:00" },
        { id: 6, device: "Cảm biến độ ẩm", action: "Gửi cảnh báo", time: "20/02/2024 14:35:00" }
    ];

    let filteredData = [...historyData];
    let currentPage = 1;
    let pageSize = 5;

    const tableBody = document.getElementById("historyTable");
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
                let item = paginatedData[i];
                const row = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.device}</td>
                        <td>${item.action}</td>
                        <td>${item.time}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            } else {
                tableBody.innerHTML += `<tr><td colspan="4">&nbsp;</td></tr>`;
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

    window.searchHistory = function () {
        let searchText = searchInput.value.toLowerCase().trim();
        
        filteredData = historyData.filter(item => {
            return (
                item.device.toLowerCase().includes(searchText) ||
                item.time.includes(searchText)
            );
        });

        currentPage = 1;
        renderTable(filteredData);
    };

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
        filteredData = [...historyData];
        currentPage = 1;
        renderTable(filteredData);
    };

    renderTable(historyData);
});
