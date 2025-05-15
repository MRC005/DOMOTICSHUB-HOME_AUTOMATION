const highPowerAppliances = [
    { name: "Fridge", status: "online", power: 450, hours: 24 },
    { name: "Washing Machine", status: "offline", power: 500, hours: 2 },
    { name: "Microwave", status: "online", power: 800, hours: 1 },
    { name: "Heater", status: "offline", power: 1500, hours: 4 },
    { name: "PC", status: "online", power: 300, hours: 8 },
    { name: "Oven", status: "online", power: 1200, hours: 2 },
    { name: "Dishwasher", status: "offline", power: 1000, hours: 3 },
    { name: "Dryer", status: "online", power: 1800, hours: 2 },
    { name: "Air Conditioner", status: "offline", power: 2000, hours: 6 },
    { name: "Water Heater", status: "online", power: 3500, hours: 3 }
];

const lowPowerAppliances = [
    { name: "Fan", status: "online", power: 75, hours: 12 },
    { name: "Light", status: "offline", power: 20, hours: 6 },
    { name: "Table Lamp", status: "online", power: 10, hours: 4 },
    { name: "TV", status: "offline", power: 150, hours: 5 },
    { name: "Router", status: "online", power: 10, hours: 24 },
    { name: "Speaker", status: "offline", power: 50, hours: 3 },
    { name: "Clock", status: "online", power: 5, hours: 24 },
    { name: "Phone Charger", status: "offline", power: 15, hours: 3 },
    { name: "Laptop Charger", status: "online", power: 90, hours: 5 },
    { name: "Gaming Console", status: "offline", power: 200, hours: 4 },
    { name: "Electric Kettle", status: "online", power: 1200, hours: 1 },
    { name: "Coffee Maker", status: "offline", power: 1000, hours: 1 },
    { name: "Toaster", status: "online", power: 800, hours: 0.5 },
    { name: "Blender", status: "offline", power: 600, hours: 0.5 },
    { name: "Iron", status: "online", power: 1200, hours: 1 },
    { name: "Hair Dryer", status: "offline", power: 1600, hours: 0.5 },
    { name: "Electric Blanket", status: "online", power: 200, hours: 8 },
    { name: "Humidifier", status: "offline", power: 50, hours: 10 },
    { name: "Air Purifier", status: "online", power: 60, hours: 12 }
];

function renderAppliances(listId, appliances) {
    const list = document.getElementById(listId);
    list.innerHTML = "";
    
    appliances.forEach((appliance, index) => {
        const div = document.createElement("div");
        div.classList.add("appliance");
        
        div.innerHTML = `
            <span>${appliance.name} (${appliance.power}W)</span>
            <span class="status ${appliance.status}">${appliance.status}</span>
            <button onclick="toggleStatus('${listId}', ${index})">Change</button>
            <button onclick="showPowerDetails('${listId}', ${index})">Power</button>
        `;
        list.appendChild(div);
    });
    updatePowerSummary();
}

function toggleStatus(listId, index) {
    let appliances = listId === "high-power-list" ? highPowerAppliances : lowPowerAppliances;
    appliances[index].status = appliances[index].status === "online" ? "offline" : "online";
    renderAppliances(listId, appliances);
}

function updatePowerSummary() {
    let totalPower = 0;
    [...highPowerAppliances, ...lowPowerAppliances].forEach(appliance => {
        if (appliance.status === "online") {
            totalPower += appliance.power;
        }
    });
    document.getElementById("power-summary").innerText = `Total Power Consumption: ${totalPower}W`;
}

function showPowerDetails(listId, index) {
    let appliances = listId === "high-power-list" ? highPowerAppliances : lowPowerAppliances;
    let appliance = appliances[index];
    
    if (appliance.status === "online") {
        const energy = (appliance.power * appliance.hours) / 1000;
        alert(`${appliance.name} consumes ${energy.toFixed(2)} kWh per day`);
    } else {
        alert(`${appliance.name} is offline`);
    }
}

renderAppliances("high-power-list", highPowerAppliances);
renderAppliances("low-power-list", lowPowerAppliances);
