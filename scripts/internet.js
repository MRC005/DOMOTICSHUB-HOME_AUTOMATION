function loadConsumptionCharts(historyData) {
    if (!historyData || historyData.length === 0) {
        console.error("No data received for charts");
        return;
    }

    console.log("Received Data:", historyData); // Debugging

    const xValues = historyData.map(entry => 
        entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString() : "N/A"
    );

    // Daily Consumption Chart
    new Chart(document.getElementById("daily-dist"), {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Daily Consumption (GB)",
                data: historyData.map(entry => entry.bandwidth_daily ?? 0), // Handle NULL values
                borderColor: "blue",
                fill: false
            }]
        },
        options: {
            responsive: true,
            title: { display: true, text: "Daily Consumption" },
            legend: { display: true, position: "bottom" },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Weekly Consumption Chart
    new Chart(document.getElementById("weekly-dist"), {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Weekly Consumption (GB)",
                data: historyData.map(entry => entry.bandwidth_weekly ?? 0),
                borderColor: "green",
                fill: false
            }]
        },
        options: {
            responsive: true,
            title: { display: true, text: "Weekly Consumption" },
            legend: { display: true, position: "bottom" },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Monthly Consumption Chart
    new Chart(document.getElementById("monthly-dist"), {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Monthly Consumption (GB)",
                data: historyData.map(entry => entry.bandwidth_monthly ?? 0),
                borderColor: "purple",
                fill: false
            }]
        },
        options: {
            responsive: true,
            title: { display: true, text: "Monthly Consumption" },
            legend: { display: true, position: "bottom" },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}


// Function to fetch historical internet data
async function fetchInternetHistory() {
    try {
        const response = await fetch("/getInternetHistory");
        const data = await response.json();
        // console.log("Fetched Internet History:", data); // Debugging step
        loadConsumptionCharts(data);
    } catch (error) {
        console.error("Error fetching internet history:", error);
    }
}

// Fetch and load charts on page load
document.addEventListener("DOMContentLoaded", fetchInternetHistory);


async function fetchInternetData() {
    try {
        const response = await fetch("http://localhost:3000/getInternetData");
        const data = await response.json();
  
        if (!data) {
            console.error("No data received.");
            return;
        }

        console.log(data);
  
        document.getElementById("bandwidth-used-today").innerText = data.bandwidth.daily + " MB";
        document.getElementById("bandwidth-used-week").innerText = data.bandwidth.weekly + " GB";
        document.getElementById("bandwidth-used-month").innerText = data.bandwidth.monthly + " TB";
        document.getElementById("conneted-devices").innerText = data.totalDevices;
        document.getElementById("latency").innerText = data.latency + " ms";
  
    } catch (error) {
        console.error("Error fetching internet data:", error);
    }
  }

// Fetch data when the page loads
document.addEventListener("DOMContentLoaded", fetchInternetData);

// Auto-refresh every 10 seconds
setInterval(fetchInternetData, 1000);
    
    //connected device types
{
    const xValues = ["Phone", "Laptop", "Desktop", "Tablet", "Smartwatch", "Smart TV", "Gaming Console"];
    const yValues = [55, 29, 34, 20, 15, 12, 18];
    const barColors = [
    "#b91d47",
    "#2b5797",
    "#1e7145",
    "#ffcc00",
    "#ff5733",
    "#33ff57",
    "#5733ff"
    ];
    
    new Chart("device-type-dist", {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    
});}
    
      




async function fetchConnectedDevices() {
    try {
        const response = await fetch("/getConnectedDevices"); // Fetch from server
        const data = await response.json(); // Convert to JSON

        if (!Array.isArray(data)) {
            console.error("Invalid data format:", data);
            return;
        }

        // Take the last 15 entries
        const latestDevices = data.slice(-15);

        updateDeviceUI(latestDevices);
    } catch (error) {
        console.error("Error fetching connected devices:", error);
    }
}

function updateDeviceUI(devices) {
    const container = document.getElementById("device-container");
    container.innerHTML = ""; // Clear previous devices

    devices.forEach((device, index) => {
        const deviceTile = document.createElement("div");
        deviceTile.className = "dev-tile";
        deviceTile.innerHTML = `
            <h2 style="font-size: 24px;">Device ${index + 1}</h2>
            <p><strong>Name:</strong> ${device.name}</p>
            <p><strong>MAC Address:</strong> ${device.mac_address}</p>
            <p><strong>IP Address:</strong> ${device.ip_address}</p>
            <p><strong>Current upload speed:</strong> ${device.upload_speed} Mbps</p>
            <p><strong>Current download speed:</strong> ${device.download_speed} Mbps</p>
            <p><strong>Data used today:</strong> ${device.data_used_today} GB</p>
        `;
        container.appendChild(deviceTile);
    });
}

// Fetch data and update UI on page load
document.addEventListener("DOMContentLoaded", fetchConnectedDevices);
// Auto-refresh every 10 seconds
setInterval(fetchConnectedDevices, 1000);