setInterval(function() {
    var newVal = Math.floor((Math.random() * 179) + 1);
    document.getElementById("power-consumption").textContent = newVal + "%";
    var gauge = document.querySelector('.gauge--3 .semi-circle--mask');
    if (gauge) {
        gauge.style.transform = `rotate(${newVal}deg)`;
    }
}, 1000);
