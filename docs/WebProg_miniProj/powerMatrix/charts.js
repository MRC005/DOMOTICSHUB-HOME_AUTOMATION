
//Load Distribution
{const xValues = ["Phase 1", "Phase 2", "Phase 3"];
const yValues = [55, 29, 34];
const barColors = [
  "#b91d47",
  "#2b5797",
  "#1e7145"
];

new Chart("load-dist", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      // text: "World Wide Wine Production 2018"
    }
  }
});}

//Power consumption
{const xValues = [100,200,300,400,500,600,700,800,900,1000];

  new Chart("power-dist", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{ 
        label: "Phase 1",
        data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
        borderColor: "red",
        fill: false
      }, { 
        label: "Phase 2",
        data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
        borderColor: "green",
        fill: false
      }, { 
        label: "Phase 3",
        data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
        borderColor: "blue",
        fill: false
      }]
    },
    options: {
      legend: { display: true }
    }
  });}

  //Current consumption
{const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  new Chart("current-dist", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{ 
        label: "Phase 1",
        data: [3.9, 5.2, 5.7, 6.1, 7.0, 7.8, 9.1, 13.0, 30.4, 10.9],
        borderColor: "red",
        fill: false
      }, { 
        label: "Phase 2",
        data: [7.0, 7.4, 8.0, 9.6, 10.8, 12.6, 18.3, 22.2, 26.9, 30.9],
        borderColor: "green",
        fill: false
      }, { 
        label: "Phase 3",
        data: [1.3, 3.0, 8.7, 21.7, 26.1, 17.4, 8.7, 4.3, 1.0, 0.4],
        borderColor: "blue",
        fill: false
      }]
    },
    options: {
      legend: { display: true }
    }
  });  
  }

//Voltage dist
{
  const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  new Chart("voltage-dist", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{ 
        label: "Phase 1",
        data: [230, 231, 229, 232, 228, 227, 233, 235, 230, 231],
        borderColor: "red",
        fill: false
      }, { 
        label: "Phase 2",
        data: [231, 232, 230, 234, 233, 232, 236, 238, 234, 232],
        borderColor: "green",
        fill: false
      }, { 
        label: "Phase 3",
        data: [229, 230, 231, 232, 228, 226, 234, 237, 233, 230],
        borderColor: "blue",
        fill: false
      }]
    },
    options: {
      legend: { display: true }
    }
  });
 }


 /* Phase 1 */
 //voltage
{ const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

new Chart("p1-v", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      label: "Voltage (V)",
      data: [230, 231, 229, 232, 230, 228, 231, 233, 230, 229],
      borderColor: "red",
      fill: false
    }]
  },
  options: {
    title: {
      display: true,
      text: "Voltage"
    },
    legend: {
      display: true,
      position: "bottom"
    }
  }
});
}

//current
{
  const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

new Chart("p1-c", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      label: "Current (A)",
      data: [2.1, 3.4, 4.0, 5.2, 6.5, 7.3, 8.8, 9.6, 10.2, 11.0],
      borderColor: "red",
      fill: false
    }]
  },
  options: {
    title: {
      display: true,
      text: "Current"
    },
    legend: {
      display: true,
      position: "bottom"
    }
  }
});

}

//current
{
  const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

new Chart("p1-p", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      label: "Power (W)",
      data: [210, 340, 400, 520, 650, 730, 880, 960, 1020, 1100],
      borderColor: "red",
      fill: false
    }]
  },
  options: {
    title: {
      display: true,
      text: "Power"
    },
    legend: {
      display: true,
      position: "bottom"
    }
  }
});

}

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
 //voltage
 { const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  new Chart("p2-v", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: "Voltage (V)",
        data: [230, 231, 229, 232, 230, 228, 231, 233, 230, 229],
        borderColor: "green",
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: "Voltage"
      },
      legend: {
        display: true,
        position: "bottom"
      }
    }
  });
  }
  
  //current
  {
    const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  
  new Chart("p2-c", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: "Current (A)",
        data: [2.1, 3.4, 4.0, 5.2, 6.5, 7.3, 8.8, 9.6, 10.2, 11.0],
        borderColor: "green",
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: "Current"
      },
      legend: {
        display: true,
        position: "bottom"
      }
    }
  });
  
  }
  
  //current
  {
    const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  
  new Chart("p2-p", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: "Power (W)",
        data: [210, 340, 400, 520, 650, 730, 880, 960, 1020, 1100],
        borderColor: "green",
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: "Power"
      },
      legend: {
        display: true,
        position: "bottom"
      }
    }
  });
  
  }
  
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
 //voltage
{ const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  new Chart("p3-v", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: "Voltage (V)",
        data: [230, 231, 229, 232, 230, 228, 231, 233, 230, 229],
        borderColor: "blue",
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: "Voltage"
      },
      legend: {
        display: true,
        position: "bottom"
      }
    }
  });
  }
  
  //current
  {
    const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  
  new Chart("p3-c", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: "Current (A)",
        data: [2.1, 3.4, 4.0, 5.2, 6.5, 7.3, 8.8, 9.6, 10.2, 11.0],
        borderColor: "blue",
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: "Current"
      },
      legend: {
        display: true,
        position: "bottom"
      }
    }
  });
  
  }
  
  //current
  {
    const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  
  new Chart("p3-p", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: "Power (W)",
        data: [210, 340, 400, 520, 650, 730, 880, 960, 1020, 1100],
        borderColor: "blue",
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: "Power"
      },
      legend: {
        display: true,
        position: "bottom"
      }
    }
  });
  
  }
  
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