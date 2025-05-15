document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM fully loaded");
    await fetchAndRenderAppliances();
});

let highPowerAppliances = [];
let lowPowerAppliances = [];

async function fetchAndRenderAppliances() {
    try {
        const response = await fetch("/getAllAppliances");
        if (!response.ok) throw new Error("Failed to fetch appliance data");
 
        const appliances = await response.json();
        console.log("Fetched Appliances:", appliances);

        highPowerAppliances = [];
        lowPowerAppliances = [];

        appliances.forEach(appliance => {
            const formattedAppliance = {
                id: appliance.id,
                name: appliance.name,
                status: appliance.state === "ON" ? "online" : "offline",
                power: appliance.power,
                hours: calculateHours(appliance.start_time, appliance.end_time),
                timer: null
            };

            if (appliance.power >= 1000) {
                highPowerAppliances.push(formattedAppliance);
            } else {
                lowPowerAppliances.push(formattedAppliance);
            }
        });

        renderAppliances("high-power-list", highPowerAppliances);
        renderAppliances("low-power-list", lowPowerAppliances);
        updatePowerSummary();

    } catch (error) {
        console.error("Error fetching appliances:", error);
    }
}

function calculateHours(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return Math.max((end - start) / 3600000, 0).toFixed(2);
}

function updatePowerSummary() {
    let totalPower = 0;
    [...highPowerAppliances, ...lowPowerAppliances].forEach(appliance => {
        if (appliance.status === "online") {
            totalPower += appliance.power * appliance.hours;
        }
    });

    const summaryElement = document.getElementById("power-summary");
    if (summaryElement) {
        summaryElement.innerHTML = `Total Power Consumption: <b>${totalPower} Wh</b>`;
    } else {
        console.error("Power summary element not found.");
    }
}

function renderAppliances(listId, appliances) {
    console.log(`Rendering ${listId} with ${appliances.length} appliances`);
    const list = document.getElementById(listId);
    if (!list) {
        console.error(`Element with ID ${listId} not found`);
        return;
    }

    list.innerHTML = "";
    appliances.forEach((appliance, index) => {
        const div = document.createElement("div");
        div.classList.add("appliance");

        div.innerHTML = `
            <span><b>ID:</b> ${appliance.id} | <b>${appliance.name}</b> (${appliance.power}W)</span>
            <span id="status-${appliance.id}" class="status ${appliance.status}">${appliance.status}</span>
            <button onclick="toggleStatus('${listId}', ${index}, ${appliance.id})">Toggle</button>
            <input type="number" id="hours-${listId}-${index}" placeholder="Hours" min="0">
            <input type="number" id="minutes-${listId}-${index}" placeholder="Minutes" min="0" max="59">
            <input type="number" id="seconds-${listId}-${index}" placeholder="Seconds" min="0" max="59">
            <button class="timer-btn" onclick="startTimer('${listId}', ${index}, ${appliance.id})">Set Timer</button>
        `;
        list.appendChild(div);
    });
}


async function toggleStatus(listId, index, applianceId) {
    let appliances = listId === "high-power-list" ? highPowerAppliances : lowPowerAppliances;
    let appliance = appliances[index];
    let newState = appliance.status === "online" ? "OFF" : "ON"; 

    try {
        const response = await fetch("/updateApplianceState", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: applianceId, state: newState })
        });

        if (!response.ok) throw new Error("Failed to update appliance state");

        // Update appliance status
        appliance.status = newState === "ON" ? "online" : "offline";

        // Update the status in the DOM directly
        document.getElementById(`status-${applianceId}`).textContent = appliance.status;
        document.getElementById(`status-${applianceId}`).className = `status ${appliance.status}`;

        // Update power summary
        updatePowerSummary();

    } catch (error) {
        console.error("Error updating appliance state:", error);
    }
}

function startTimer(listId, index, applianceId) {
    let appliances = listId === "high-power-list" ? highPowerAppliances : lowPowerAppliances;
    let appliance = appliances[index];

    let hours = parseInt(document.getElementById(`hours-${listId}-${index}`).value) || 0;
    let minutes = parseInt(document.getElementById(`minutes-${listId}-${index}`).value) || 0;
    let seconds = parseInt(document.getElementById(`seconds-${listId}-${index}`).value) || 0;

    let totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (totalMilliseconds > 0) {
        appliance.timer = setTimeout(async () => {
            await toggleStatus(listId, index, applianceId);
        }, totalMilliseconds);
        alert(`Timer set for ${hours}h ${minutes}m ${seconds}s`);
    } else {
        alert("Invalid timer duration.");
    }
}
