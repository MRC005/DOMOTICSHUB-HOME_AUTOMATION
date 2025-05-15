const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // Import MySQL library

const app = express();
const PORT = 3000;

// MySQL Database Configuration for `power`
const powerDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password", // Change to your actual MySQL password
    database: "power"
});

// MySQL Database Configuration for `internet`
const internetDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password", // Change if different
    database: "internet"
});


const devicesDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password", // Change if different
    database: "devices"
});

const appliancesDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password", // Change if different
    database: "appliances"
});

// Connect to `power` database
powerDB.connect((err) => {
    if (err) {
        console.error("Power database connection failed:", err);
        return;
    }
    console.log("Connected to Power Database.");
});

// Connect to `internet` database
internetDB.connect((err) => {
    if (err) {
        console.error("Internet database connection failed:", err);
        return;
    }
    console.log("Connected to Internet Database.");
});

devicesDB.connect((err) => {
    if (err) {
        console.error("Devices database connection failed:", err);
        return;
    }
    console.log("Connected to Devices Database.");
});

appliancesDB.connect((err) => {
    if (err) {
        console.error("Appliances database connection failed:", err);
        return;
    }
    console.log("Connected to Appliances Database.");
});

app.use(express.json()); // Enable JSON parsing



// Serve static files
app.use('/dist', express.static(path.join(__dirname, "dist")));
app.use('/html', express.static(path.join(__dirname, 'html')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

// Serve the home page explicitly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'home.html'));
});



// API Route: Fetch Latest Power Data
app.get('/getPowerData', (req, res) => {
    const query = "SELECT * FROM power_data ORDER BY timestamp DESC LIMIT 1";

    powerDB.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Database query failed" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "No data found" });
            return;
        }

        const data = results[0]; // Latest row
        const powerData = {
            energyConsumption: data.energy_consumption_kwh,
            voltage: data.voltage,
            frequency: data.frequency,
            apparentPower: data.apparent_power,
            reactivePower: data.reactive_power,
            powerFactor: data.power_factor,
            loadPercentage: data.load_percentage,
            totalPower: data.total_power,
            totalCurrent: data.total_current,

            phase1: {
                loadPercentage: data.phase1_load_percentage,
                power: data.phase1_power,
                voltage: data.phase1_voltage,
                current: data.phase1_current,
                frequency: data.phase1_frequency,
                powerFactor: data.phase1_power_factor
            },

            phase2: {
                loadPercentage: data.phase2_load_percentage,
                power: data.phase2_power,
                voltage: data.phase2_voltage,
                current: data.phase2_current,
                frequency: data.phase2_frequency,
                powerFactor: data.phase2_power_factor
            },

            phase3: {
                loadPercentage: data.phase3_load_percentage,
                power: data.phase3_power,
                voltage: data.phase3_voltage,
                current: data.phase3_current,
                frequency: data.phase3_frequency,
                powerFactor: data.phase3_power_factor
            },

            timestamp: data.timestamp
        };

        res.json(powerData);
    });
});

// API Route: Fetch Power History (last 10 records)
app.get('/getPowerHistory', (req, res) => {
    const query = "SELECT timestamp, phase1_power, phase2_power, phase3_power FROM power_data ORDER BY timestamp DESC LIMIT 10";

    powerDB.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching historical data:", error);
            res.status(500).json({ error: "Database query failed" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "No historical data found" });
            return;
        }

        res.json(results.reverse()); // Reverse to show oldest first
    });
});

// API Route: Fetch Current Consumption History (last 10 records)
app.get('/getCurrentHistory', (req, res) => {
    const query = "SELECT timestamp, phase1_current, phase2_current, phase3_current FROM power_data ORDER BY timestamp DESC LIMIT 10";

    powerDB.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching current history:", error);
            res.status(500).json({ error: "Database query failed" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "No current history found" });
            return;
        }

        res.json(results.reverse()); // Reverse to show oldest first
    });
});


// API Route: Fetch Voltage History (last 10 records)
app.get('/getVoltageHistory', (req, res) => {
    const query = "SELECT timestamp, phase1_voltage, phase2_voltage, phase3_voltage FROM power_data ORDER BY timestamp DESC LIMIT 10";

    powerDB.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching voltage history:", error);
            res.status(500).json({ error: "Database query failed" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "No voltage history found" });
            return;
        }

        res.json(results.reverse()); // Reverse to show oldest first
    });
});


// API Route: Fetch Phase 1 Voltage, Current, and Power History (last 10 records)
app.get('/getPhase1History', (req, res) => {
    const query = "SELECT timestamp, phase1_voltage, phase1_current, phase1_power FROM power_data ORDER BY timestamp DESC LIMIT 10";

    powerDB.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching Phase 1 history:", error);
            res.status(500).json({ error: "Database query failed" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "No Phase 1 history found" });
            return;
        }

        res.json(results.reverse()); // Reverse to show oldest first
    });
});



// API Route: Fetch Phase 2 Voltage, Current, and Power History (last 10 records)
app.get('/getPhase2History', (req, res) => {
    const query = "SELECT timestamp, phase2_voltage, phase2_current, phase2_power FROM power_data ORDER BY timestamp DESC LIMIT 10";

    powerDB.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching Phase 2 history:", error);
            res.status(500).json({ error: "Database query failed" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "No Phase 2 history found" });
            return;
        }

        res.json(results.reverse()); // Reverse to show oldest first
    });
});

// API Route: Fetch Phase 3 Voltage, Current, and Power History (last 10 records)
app.get('/getPhase3History', (req, res) => {
    const query = "SELECT timestamp, phase3_voltage, phase3_current, phase3_power FROM power_data ORDER BY timestamp DESC LIMIT 10";

    powerDB.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching Phase 3 history:", error);
            res.status(500).json({ error: "Database query failed" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "No Phase 3 history found" });
            return;
        }

        res.json(results.reverse()); // Reverse to show oldest first
    });
});


// Fetch latest internet data
app.get('/getInternetData', (req, res) => {
    const query = "SELECT * FROM internet_data ORDER BY timestamp DESC LIMIT 1";

    internetDB.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching internet data:", error);
            res.status(500).json({ error: "Database query failed" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "No internet data found" });
            return;
        }

        const data = results[0]; // Latest row

        const internetData = {
            uploadSpeed: data.upload_speed,          // Mbps
            downloadSpeed: data.download_speed,      // Mbps
            latency: data.latency,                   // ms
            totalDevices: data.total_devices,        // Number of devices
            bandwidth: {
                daily: data.bandwidth_daily,         // GB
                weekly: data.bandwidth_weekly,       // GB
                monthly: data.bandwidth_monthly      // GB
            },
            timestamp: data.timestamp
        };

        res.json(internetData);
    });
});


// Fetch historical internet data
app.get("/getInternetHistory", (req, res) => {
    const query = "SELECT * FROM internet_data ORDER BY timestamp DESC LIMIT 10";

    internetDB.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching history:", err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
        res.json(result); // Send last 10 records
    });
});

// API Endpoint to get connected devices
app.get("/getConnectedDevices", (req, res) => {
    const sql = "SELECT * FROM connected_devices";
    
    devicesDB.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching connected devices:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.json(result);
    });
});



// Fetch all appliances data with structured response
app.get("/getAllAppliances", (req, res) => {
    appliancesDB.query("SELECT * FROM appliance_data", (err, results) => {
        if (err) {
            console.error("Error fetching appliances:", err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(results);
        }
    });
});


app.post("/updateApplianceState", (req, res) => {
    console.log("Received request:", req.body); // Debugging log

    const { id, state } = req.body;

    if (!id || !state) {
        console.log(" Missing ID or state");
        return res.status(400).json({ error: "Missing ID or state" });
    }

    const query = "UPDATE appliance_data SET state = ? WHERE id = ?";
    appliancesDB.query(query, [state, id], (err, result) => {
        if (err) {
            console.error(" Database Error:", err);
            return res.status(500).json({ error: "Database update failed" });
        }

        if (result.affectedRows === 0) {
            console.log(" Appliance not found in DB");
            return res.status(404).json({ error: "Appliance not found" });
        }

        console.log(" State updated successfully");
        res.json({ success: true, message: "State updated successfully" });
    });
});

app.use(express.json()); // Middleware to parse JSON request bodies

//add an appliance
app.post("/addAppliance", (req, res) => {
    console.log("Received add request:", req.body);

    let { name, state, power, start_time, end_time, power_level } = req.body;

    // Validate required fields
    if (!name || !state || !power || !start_time || !end_time || !power_level) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // If start_time or end_time is '0', replace with NULL for MySQL
    start_time = start_time === '0' ? null : start_time;
    end_time = end_time === '0' ? null : end_time;

    const query = "INSERT INTO appliance_data (name, state, power, start_time, end_time, power_level) VALUES (?, ?, ?, ?, ?, ?)";
    
    appliancesDB.query(query, [name, state, power, start_time, end_time, power_level], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database insertion failed" });
        }
        
        res.json({ success: true, message: "Appliance added successfully", id: result.insertId });
    });
});


// Remove Appliance API
app.delete("/removeAppliance", (req, res) => {
    console.log("Received delete request:", req.body);

    const { id } = req.body;

    if (!id) {
        console.log("Missing appliance ID");
        return res.status(400).json({ error: "Appliance ID is required" });
    }

    const query = "DELETE FROM appliance_data WHERE id = ?";
    appliancesDB.query(query, [id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database deletion failed" });
        }

        if (result.affectedRows === 0) {
            console.log("Appliance not found");
            return res.status(404).json({ error: "Appliance not found" });
        }

        console.log("Appliance deleted successfully");
        res.json({ success: true, message: "Appliance deleted successfully" });
    });
});




// Serve any requested HTML file dynamically
app.get('/:page', (req, res) => {
    const filePath = path.join(__dirname, 'html', `${req.params.page}`);
    
    if (filePath.endsWith('.html')) {
        res.sendFile(filePath, (err) => {
            if (err) res.status(404).send('Page Not Found');
        });
    } else {
        res.status(404).send('Page Not Found');
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
