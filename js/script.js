$(document).ready(function () {
  const apiUrl = "https://script.google.com/macros/s/AKfycbwx8IZZ4OHSoXFS8fv2f7Cx6PvA5Sbb-zSk7xdWxeicaGtqbHcLZylyD8SUwKngoy4v/exec";

  let previousData = [];

  function formatDate(date) {
    const d = new Date(date);
    if (d instanceof Date && !isNaN(d)) {
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return "Invalid Date";
  }

  function formatPrice(price) {
    if (price && !isNaN(price)) {
      return "Rp. " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return "Belum Diisi";
  }

  function loadData() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (JSON.stringify(data) !== JSON.stringify(previousData)) {
          previousData = data;

          const tableBody = document.getElementById("data-table");
          tableBody.innerHTML = "";

          data.forEach((item, index) => {
            const row = document.createElement("tr");

            const formattedDate = formatDate(item.Tanggal);
            const formattedPrice = formatPrice(item.Harga);

            row.innerHTML = `
                    <td class="text-center">${index + 1}.</td>
                    <td>${formattedDate || "Belum Diisi"}</td>
                    <td class="text-start">${item["Nama Alat"] || "Belum Diisi"}</td>
                    <td class="text-start">${item.Deskripsi || "Belum Diisi"}</td>
                    <td class="text-end">${formattedPrice}</td>
                  `;
            tableBody.appendChild(row);
          });

          $("#Table").DataTable();
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  loadData();

  setInterval(loadData, 1000);
});
