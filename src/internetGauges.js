import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import GaugeComponent from "react-gauge-component";


let data = {};

async function fetchInternetData() {
  try {
      const response = await fetch("http://localhost:3000/getInternetData");
      const newData = await response.json();

      if (!newData) {
          console.error("No data received.");
          return;
      }

      data = newData;
      // console.log(data);

  } catch (error) {
      console.error("Error fetching internet data:", error);
  }
}


function Upload_speed() {
    const [value, setValue] = useState(300); // Initial value

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(data.uploadSpeed); // Random value between 0 and 1000 Mbps
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <GaugeComponent 
              arc={{
                nbSubArcs: 10,
                colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
                width: 0.3,
                padding: 0.003
              }}
              labels={{
                valueLabel: {
                  style: { fill: "black", fontFamily: "Orbitron", fontSize: '24px' },
                  formatTextValue: (val) => `${val} Mbps`
                },
                tickLabels: {
                  type: "outer",
                  ticks: [
                    { value: 0, text: "0 Mbps" },
                    { value: 100, text: "100 Mbps" },
                    { value: 250, text: "250 Mbps" },
                    { value: 500, text: "500 Mbps" },
                    { value: 750, text: "750 Mbps" },
                    { value: 1000, text: "1 Gbps" }
                  ],
                  defaultTickValueConfig: {
                    formatTextValue: (val) => `${val}Mbps`
                  }
                }
              }}
              value={value}
              maxValue={1000} // 1Gbps max
            />
        </div>
    );
}

function Download_speed() {
  const [value, setValue] = useState(300); // Initial value

  useEffect(() => {
    const interval = setInterval(() => {
        setValue(data.downloadSpeed); // Random value between 0 and 1000 Mbps
    }, 1000);

    return () => clearInterval(interval);
}, []);

  return (
      <div>
          <GaugeComponent 
            arc={{
              nbSubArcs: 10,
              colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
              width: 0.3,
              padding: 0.003
            }}
            labels={{
              valueLabel: {
                style: { fill: "black", fontFamily: "Orbitron", fontSize: '24px' },
                formatTextValue: (val) => `${val} Mbps`
              },
              tickLabels: {
                type: "outer",
                ticks: [
                  { value: 0, text: "0 Mbps" },
                  { value: 100, text: "100 Mbps" },
                  { value: 250, text: "250 Mbps" },
                  { value: 500, text: "500 Mbps" },
                  { value: 750, text: "750 Mbps" },
                  { value: 1000, text: "1 Gbps" }
                ],
                defaultTickValueConfig: {
                  formatTextValue: (val) => `${val}Mbps`
                }
              }
            }}
            value={value}
            maxValue={1000} // 1Gbps max
          />
      </div>
  );
}

// Fetch data when the page loads
document.addEventListener("DOMContentLoaded", fetchInternetData);

// Auto-refresh every 10 seconds
setInterval(fetchInternetData, 1000);

ReactDOM.createRoot(document.getElementById("upload_speed")).render(<Upload_speed />);
ReactDOM.createRoot(document.getElementById("download_speed")).render(<Download_speed />);
