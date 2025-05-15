
let data = {};

async function fetchData(url, callback) {
  try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data || (Array.isArray(data) && data.length === 0)) {
          console.error(`No data received from ${url}`);
          return;
      }

      callback(data);
  } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
  }
}

// 📌 Fetch and update power data
function updatePowerData(newData) {
  data = newData; // Update global variable

  // Load charts
  loadOverallLoadDistChart();
}

// 📌 Load Overall Load Distribution Chart
function loadOverallLoadDistChart() {
  const xValues = ["Phase 1", "Phase 2", "Phase 3"];
  const yValues = [
      data.phase1?.loadPercentage || 0,
      data.phase2?.loadPercentage || 0,
      data.phase3?.loadPercentage || 0
  ];
  const barColors = ["#b91d47", "#2b5797", "#1e7145"];

  new Chart("load-dist", {
      type: "doughnut",
      data: { labels: xValues, datasets: [{ backgroundColor: barColors, data: yValues }] },
      options: { title: { display: true, text: "Load Distribution" } }
  });
}

// 📌 Load Power Distribution Chart
function loadOverallPowerDistChart(historyData) {
  loadLineChart("power-dist", "Power (W)", historyData, "phase1_power", "phase2_power", "phase3_power");
}

// 📌 Load Current Distribution Chart
function loadCurrentChart(historyData) {
  loadLineChart("current-dist", "Current (A)", historyData, "phase1_current", "phase2_current", "phase3_current");
}

// 📌 Load Voltage Distribution Chart
function loadVoltageChart(historyData) {
  loadLineChart("voltage-dist", "Voltage (V)", historyData, "phase1_voltage", "phase2_voltage", "phase3_voltage");
}

// 📌 Generic function to load line charts
function loadLineChart(chartId, title, historyData, phase1Key, phase2Key, phase3Key) {
  const xValues = historyData.map(entry => new Date(entry.timestamp).toLocaleTimeString());

  new Chart(chartId, {
      type: "line",
      data: {
          labels: xValues,
          datasets: [
              { label: "Phase 1", data: historyData.map(entry => entry[phase1Key]), borderColor: "red", fill: false },
              { label: "Phase 2", data: historyData.map(entry => entry[phase2Key]), borderColor: "green", fill: false },
              { label: "Phase 3", data: historyData.map(entry => entry[phase3Key]), borderColor: "blue", fill: false }
          ]
      },
      options: { title: { display: true, text: title }, legend: { display: true } }
  });
}

// 📌 Fetch data on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchData("http://localhost:3000/getPowerData", updatePowerData);
  fetchData("http://localhost:3000/getPowerHistory", loadOverallPowerDistChart);
  fetchData("http://localhost:3000/getCurrentHistory", loadCurrentChart);
  fetchData("http://localhost:3000/getVoltageHistory", loadVoltageChart);
});




async function fetchPhase1History() {
  try {
      const response = await fetch("http://localhost:3000/getPhase1History");
      const historyData = await response.json();

      if (!historyData || historyData.length === 0) {
          console.error("No Phase 1 history received.");
          return;
      }

      loadPhase1Charts(historyData);

  } catch (error) {
      console.error("Error fetching Phase 1 history:", error);
  }
}

function loadPhase1Charts(historyData) {
  const xValues = historyData.map(entry => new Date(entry.timestamp).toLocaleTimeString());

  // Voltage Chart
  new Chart("p1-v", {
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
              label: "Voltage (V)",
              data: historyData.map(entry => entry.phase1_voltage),
              borderColor: "red",
              fill: false
          }]
      },
      options: {
          title: { display: true, text: "Phase 1 Voltage" },
          legend: { display: true, position: "bottom" }
      }
  });

  // Current Chart
  new Chart("p1-c", {
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
              label: "Current (A)",
              data: historyData.map(entry => entry.phase1_current),
              borderColor: "red",
              fill: false
          }]
      },
      options: {
          title: { display: true, text: "Phase 1 Current" },
          legend: { display: true, position: "bottom" }
      }
  });

  // Power Chart
  new Chart("p1-p", {
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
              label: "Power (W)",
              data: historyData.map(entry => entry.phase1_power),
              borderColor: "red",
              fill: false
          }]
      },
      options: {
          title: { display: true, text: "Phase 1 Power" },
          legend: { display: true, position: "bottom" }
      }
  });
}

// Fetch historical power data for Phase 1 on page load
document.addEventListener("DOMContentLoaded", fetchPhase1History);



//frequency
{const xValues = [];
  const yValues = [];
  const frequency = 50;
  const samplingRate = 1000; // Higher value for smoother curve
  const duration = 0.1; // 0.1 seconds to show a few cycles
  
  generateData(frequency, samplingRate, duration);
  
  new Chart("p1-f", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: "50Hz Sine Wave",
        fill: false,
        pointRadius: 1,
        borderColor: "rgba(255,0,0,0.5)",
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Frequency (50Hz)"
      },
      legend: {
        display: true,
        position: "bottom"
      },
      responsive: true,
      maintainAspectRatio: true
    }
  });
  
  function generateData(frequency, samplingRate, duration) {
    const timeStep = 1 / samplingRate; // Time interval
    for (let t = 0; t <= duration; t += timeStep) {
      xValues.push(t.toFixed(4)); // Time values (in seconds)
      yValues.push(Math.sin(2 * Math.PI * frequency * t)); // Sine wave formula
    }
  }
}



/* Phase 2 */
async function fetchPhase2History() {
  try {
      const response = await fetch("http://localhost:3000/getPhase2History");
      const historyData = await response.json();

      if (!historyData || historyData.length === 0) {
          console.error("No Phase 2 history received.");
          return;
      }

      loadPhase2Charts(historyData);

  } catch (error) {
      console.error("Error fetching Phase 2 history:", error);
  }
}

function loadPhase2Charts(historyData) {
  const xValues = historyData.map(entry => new Date(entry.timestamp).toLocaleTimeString());

  // Voltage Chart
  new Chart("p2-v", {
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
              label: "Voltage (V)",
              data: historyData.map(entry => entry.phase2_voltage),
              borderColor: "green",
              fill: false
          }]
      },
      options: {
          title: { display: true, text: "Phase 2 Voltage" },
          legend: { display: true, position: "bottom" }
      }
  });

  // Current Chart
  new Chart("p2-c", {
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
              label: "Current (A)",
              data: historyData.map(entry => entry.phase2_current),
              borderColor: "green",
              fill: false
          }]
      },
      options: {
          title: { display: true, text: "Phase 2 Current" },
          legend: { display: true, position: "bottom" }
      }
  });

  // Power Chart
  new Chart("p2-p", {
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
              label: "Power (W)",
              data: historyData.map(entry => entry.phase2_power),
              borderColor: "green",
              fill: false
          }]
      },
      options: {
          title: { display: true, text: "Phase 2 Power" },
          legend: { display: true, position: "bottom" }
      }
  });
}

// Fetch historical power data for Phase 2 on page load
document.addEventListener("DOMContentLoaded", fetchPhase2History);

  
  //frequency
  {const xValues = [];
    const yValues = [];
    const frequency = 50;
    const samplingRate = 1000; // Higher value for smoother curve
    const duration = 0.1; // 0.1 seconds to show a few cycles
    
    generateData(frequency, samplingRate, duration);
    
    new Chart("p2-f", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          label: "50Hz Sine Wave",
          fill: false,
          pointRadius: 1,
          borderColor: "green",
          data: yValues
        }]
      },
      options: {
        title: {
          display: true,
          text: "Frequency (50Hz)"
        },
        legend: {
          display: true,
          position: "bottom"
        },
        responsive: true,
        maintainAspectRatio: true
      }
    });
    
    function generateData(frequency, samplingRate, duration) {
      const timeStep = 1 / samplingRate; // Time interval
      for (let t = 0; t <= duration; t += timeStep) {
        xValues.push(t.toFixed(4)); // Time values (in seconds)
        yValues.push(Math.sin(2 * Math.PI * frequency * t)); // Sine wave formula
      }
    }
  }



  /* Phase 3 */
  async function fetchPhase3History() {
    try {
        const response = await fetch("http://localhost:3000/getPhase3History");
        const historyData = await response.json();

        if (!historyData || historyData.length === 0) {
            console.error("No Phase 3 history received.");
            return;
        }

        loadPhase3Charts(historyData);

    } catch (error) {
        console.error("Error fetching Phase 3 history:", error);
    }
}

function loadPhase3Charts(historyData) {
    const xValues = historyData.map(entry => new Date(entry.timestamp).toLocaleTimeString());

    // Voltage Chart
    new Chart("p3-v", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Voltage (V)",
                data: historyData.map(entry => entry.phase3_voltage),
                borderColor: "blue",
                fill: false
            }]
        },
        options: {
            title: { display: true, text: "Phase 3 Voltage" },
            legend: { display: true, position: "bottom" }
        }
    });

    // Current Chart
    new Chart("p3-c", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Current (A)",
                data: historyData.map(entry => entry.phase3_current),
                borderColor: "blue",
                fill: false
            }]
        },
        options: {
            title: { display: true, text: "Phase 3 Current" },
            legend: { display: true, position: "bottom" }
        }
    });

    // Power Chart
    new Chart("p3-p", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Power (W)",
                data: historyData.map(entry => entry.phase3_power),
                borderColor: "blue",
                fill: false
            }]
        },
        options: {
            title: { display: true, text: "Phase 3 Power" },
            legend: { display: true, position: "bottom" }
        }
    });
}

// Fetch historical power data for Phase 3 on page load
document.addEventListener("DOMContentLoaded", fetchPhase3History);

  
  //frequency
  {const xValues = [];
    const yValues = [];
    const frequency = 50;
    const samplingRate = 1000; // Higher value for smoother curve
    const duration = 0.1; // 0.1 seconds to show a few cycles
    
    generateData(frequency, samplingRate, duration);
    
    new Chart("p3-f", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          label: "50Hz Sine Wave",
          fill: false,
          pointRadius: 1,
          borderColor: "blue",
          data: yValues
        }]
      },
      options: {
        title: {
          display: true,
          text: "Frequency (50Hz)"
        },
        legend: {
          display: true,
          position: "bottom"
        },
        responsive: true,
        maintainAspectRatio: true
      }
    });
    
    function generateData(frequency, samplingRate, duration) {
      const timeStep = 1 / samplingRate; // Time interval
      for (let t = 0; t <= duration; t += timeStep) {
        xValues.push(t.toFixed(4)); // Time values (in seconds)
        yValues.push(Math.sin(2 * Math.PI * frequency * t)); // Sine wave formula
      }
    }
  }





// Fetch data when the page loads
document.addEventListener("DOMContentLoaded", fetchPowerData);
document.addEventListener("DOMContentLoaded", fetchPowerHistory);





