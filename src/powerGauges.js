import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import GaugeComponent from "react-gauge-component";



let powerData = {}; 

async function fetchPowerData() {
  try {
      const response = await fetch("http://localhost:3000/getPowerData"); // Fetch from existing server
      const data = await response.json();

      if (!data || Object.keys(data).length === 0) {
          console.error("No data received.");
          return;
      }

      powerData = data;

      // document.getElementById("loadPercentage").innerText = data.loadPercentage + " %";
      // document.getElementById("totalPower").innerText = data.totalPower + " W";
      // document.getElementById("totalCurrent").innerText = data.totalCurrent + " A";

      // // Phase-wise details
      // document.getElementById("phase1Load").innerText = data.phase1.loadPercentage + " %";

      // document.getElementById("phase2Load").innerText = data.phase2.loadPercentage + " %";

      // document.getElementById("phase3Load").innerText = data.phase3.loadPercentage + " %";

      // document.getElementById("timestamp").innerText = "Last Updated: " + new Date(data.timestamp).toLocaleString();
      
  } catch (error) {
      console.error("Error fetching power data:", error);
  }
}





function Load_percent_gauge() {
  const [value, setValue] = useState(30);

  useEffect(() => {
      const interval = setInterval(() => {
          setValue(powerData.loadPercentage);
      }, 1000); // Update every second

      return () => clearInterval(interval);
  }, []);

    return (
        <div>
            <GaugeComponent 
              value={value}
              type="radial"
              labels={{
                tickLabels: {
                  type: "inner",
                  ticks: [
                    { value: 20 },
                    { value: 40 },
                    { value: 60 },
                    { value: 80 },
                    { value: 100 }
                  ]
                },
                valueLabel: { //setting color to black
                  formatTextValue: (val) => `${val} %`,
                  style: {fill: "black", fontFamily: "Orbitron", fontSize: '24px'}
                }
              }}

              arc={{
                colorArray: ['#5BE12C','#EA4228'],
                subArcs: [{limit: 10}, {limit: 30}, {}, {}, {}],
                padding: 0.02,
                width: 0.3
              }}
              pointer={{
                elastic: true,
                animationDelay: 0
              }}
            />
        </div>
    );
}

function Power_gauge() {
  const [value, setValue] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
        setValue(powerData.totalPower);
    }, 1000); // Update every second

    return () => clearInterval(interval);
}, []);


  return (
      <div>
          {/* <h2>React Gauge</h2> */}
          <GaugeComponent 
            value={value}
            type="radial"
            labels={{
              tickLabels: {
                type: "inner",
                ticks: [
                  { value: 20, text: "2kW" },
                  { value: 40, text: "4kW" },
                  { value: 60, text: "6kW" },
                  { value: 80, text: "8kW" },
                  { value: 100, text: "10kW" }
                ],
                defaultTickValueConfig: {
                  formatTextValue: (val) => `${(val / 2)}kW`
                }
              },
              valueLabel: { //setting color to black
                formatTextValue: (val) => `${val} kW`,
                style: {fill: "black", fontFamily: "Orbitron", fontSize: '24px'}
              }
            }}

            arc={{
              colorArray: ['#5BE12C','#EA4228'],
              subArcs: [{limit: 10}, {limit: 30}, {}, {}, {}],
              padding: 0.02,
              width: 0.3
            }}
            pointer={{
              elastic: true,
              animationDelay: 0
            }}
          />
      </div>
  );
}

function Current_gauge() {
  const [value, setValue] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
        setValue(powerData.totalCurrent);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);


  return (
      <div>
          {/* <h2>React Gauge</h2> */}
          <GaugeComponent 
            value={value}
            type="radial"
            labels={{
              tickLabels: {
                type: "inner",
                ticks: [
                  { value: 20, text: "10A" },
                  { value: 40, text: "20A" },
                  { value: 60, text: "30A" },
                  { value: 80, text: "40A" },
                  { value: 100, text: "50A" }
                ],
                defaultTickValueConfig: {
                  formatTextValue: (val) => `${(val / 2)}A`
                }
              },
              valueLabel: { //setting color to black
                formatTextValue: (val) => `${val} A`,
                style: {fill: "black", fontFamily: "Orbitron", fontSize: '24px'}
              }
            }}

            arc={{
              colorArray: ['#5BE12C','#EA4228'],
              subArcs: [{limit: 10}, {limit: 30}, {}, {}, {}],
              padding: 0.02,
              width: 0.3
            }}
            pointer={{
              elastic: true,
              animationDelay: 0
            }}
          />
      </div>
  );
}


function Phase1_load() {
  const [value, setValue] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
        setValue(powerData.phase1.loadPercentage);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);


  return (
      <div>
          {/* <h2>React Gauge</h2> */}
          <GaugeComponent 
            type="semicircle"
            arc={{
              colorArray: ['#00FF15', '#FF2121'],
              padding: 0.02,
              subArcs:
                [
                  { limit: 40 },
                  { limit: 60 },
                  { limit: 70 },
                  {},
                  {},
                  {},
                  {}
                ]
            }}
            labels={{
              valueLabel: { //setting cofont & color
                formatTextValue: (val) => `${val} %`,
                style: {fill: "black", fontFamily: "Orbitron", fontSize: '24px'}
              }
              
            }}
            pointer={{type: "blob", animationDelay: 0 }}
            value={value}
          />
      </div>
  );
}

function Phase2_load() {
  const [value, setValue] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
        setValue(powerData.phase2.loadPercentage);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);


  return (
      <div>
          {/* <h2>React Gauge</h2> */}
          <GaugeComponent 
            type="semicircle"
            arc={{
              colorArray: ['#00FF15', '#FF2121'],
              padding: 0.02,
              subArcs:
                [
                  { limit: 40 },
                  { limit: 60 },
                  { limit: 70 },
                  {},
                  {},
                  {},
                  {}
                ]
            }}
            labels={{
              valueLabel: { //setting cofont & color
                formatTextValue: (val) => `${val} %`,
                style: {fill: "black", fontFamily: "Orbitron", fontSize: '24px'}
              }
              
            }}
            pointer={{type: "blob", animationDelay: 0 }}
            value={value}
          />
      </div>
  );
}

function Phase3_load() {
  const [value, setValue] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
        setValue(powerData.phase3.loadPercentage);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);


  return (
      <div>
          {/* <h2>React Gauge</h2> */}
          <GaugeComponent 
            type="semicircle"
            arc={{
              colorArray: ['#00FF15', '#FF2121'],
              padding: 0.02,
              subArcs:
                [
                  { limit: 40 },
                  { limit: 60 },
                  { limit: 70 },
                  {},
                  {},
                  {},
                  {}
                ]
            }}
            labels={{
              valueLabel: { //setting cofont & color
                formatTextValue: (val) => `${val} %`,
                style: {fill: "black", fontFamily: "Orbitron", fontSize: '24px'}
              }
              
            }}
            pointer={{type: "blob", animationDelay: 0 }}
            value={value}
          />
      </div>
  );
}

// Fetch data when the page loads
document.addEventListener("DOMContentLoaded", fetchPowerData);


// Auto-refresh every 10 seconds
setInterval(fetchPowerData, 1000);


ReactDOM.createRoot(document.getElementById("load_percent_gauge")).render(<Load_percent_gauge />);
ReactDOM.createRoot(document.getElementById("power_gauge")).render(<Power_gauge />);
ReactDOM.createRoot(document.getElementById("current_gauge")).render(<Current_gauge />);
ReactDOM.createRoot(document.getElementById("phase1_load")).render(<Phase1_load />);
ReactDOM.createRoot(document.getElementById("phase2_load")).render(<Phase2_load />);
ReactDOM.createRoot(document.getElementById("phase3_load")).render(<Phase3_load />);
