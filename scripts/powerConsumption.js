async function fetchPowerData() {
    try {
        const response = await fetch("http://localhost:3000/getPowerData"); // Fetch from existing server
        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            console.error("No data received.");
            return;
        }

        document.getElementById("energy_consumption_kwh").innerText = data.energyConsumption + " kWh";
        document.getElementById("voltage").innerText = data.voltage + " V";
        document.getElementById("frequency").innerText = data.frequency + " Hz";
        document.getElementById("apparent_power").innerText = data.apparentPower + " VA";
        document.getElementById("reactive_power").innerText = data.reactivePower + " VAR";
        document.getElementById("power_factor").innerText = data.powerFactor;
        // document.getElementById("loadPercentage").innerText = data.loadPercentage + " %";
        // document.getElementById("totalPower").innerText = data.totalPower + " W";
        // document.getElementById("totalCurrent").innerText = data.totalCurrent + " A";

        // Phase-wise details
        // document.getElementById("phase1Load").innerText = data.phase1.loadPercentage + " %";
        document.getElementById("phase1_power").innerText = data.phase1.power + " W";
        document.getElementById("phase1_voltage").innerText = data.phase1.voltage + " V";
        document.getElementById("phase1_current").innerText = data.phase1.current + " A";
        document.getElementById("phase1_frequency").innerText = data.phase1.frequency + " Hz";
        document.getElementById("phase1_power_factor").innerText = data.phase1.powerFactor;

        // document.getElementById("phase2Load").innerText = data.phase2.loadPercentage + " %";
        document.getElementById("phase2_power").innerText = data.phase2.power + " W";
        document.getElementById("phase2_voltage").innerText = data.phase2.voltage + " V";
        document.getElementById("phase2_current").innerText = data.phase2.current + " A";
        document.getElementById("phase2_frequency").innerText = data.phase2.frequency + " Hz";
        document.getElementById("phase2_power_factor").innerText = data.phase2.powerFactor;

        // document.getElementById("phase3Load").innerText = data.phase3.loadPercentage + " %";
        document.getElementById("phase3_power").innerText = data.phase3.power + " W";
        document.getElementById("phase3_voltage").innerText = data.phase3.voltage + " V";
        document.getElementById("phase3_current").innerText = data.phase3.current + " A";
        document.getElementById("phase3_frequency").innerText = data.phase3.frequency + " Hz";
        document.getElementById("phase3_power_factor").innerText = data.phase3.powerFactor;

        // document.getElementById("timestamp").innerText = "Last Updated: " + new Date(data.timestamp).toLocaleString();
        
    } catch (error) {
        console.error("Error fetching power data:", error);
    }
}

// Fetch data when the page loads
document.addEventListener("DOMContentLoaded", fetchPowerData);


// Auto-refresh every 10 seconds
setInterval(fetchPowerData, 1000);
