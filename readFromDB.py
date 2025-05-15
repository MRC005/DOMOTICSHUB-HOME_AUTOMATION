import mysql.connector

# MySQL Connection Config
config = {
    "host": "localhost",
    "user": "root",
    "password": "password",
}

# Connect to MySQL Server
conn = mysql.connector.connect(**config)
cursor = conn.cursor()

# Function to read and print data
def read_and_print_data():
    print("\n--- POWER DATABASE ---")
    cursor.execute("USE power")
    cursor.execute("SELECT * FROM power_data ORDER BY timestamp DESC LIMIT 1")
    power_data = cursor.fetchone()
    if power_data:
        power_labels = [
            "Energy Consumption (kWh)", "Voltage", "Frequency", "Apparent Power",
            "Reactive Power", "Power Factor", "Load Percentage", "Total Power", "Total Current",
            "Phase 1 Load Percentage", "Phase 1 Power", "Phase 1 Voltage", "Phase 1 Current", "Phase 1 Frequency", "Phase 1 Power Factor",
            "Phase 2 Load Percentage", "Phase 2 Power", "Phase 2 Voltage", "Phase 2 Current", "Phase 2 Frequency", "Phase 2 Power Factor",
            "Phase 3 Load Percentage", "Phase 3 Power", "Phase 3 Voltage", "Phase 3 Current", "Phase 3 Frequency", "Phase 3 Power Factor"
        ]
        for label, value in zip(power_labels, power_data[1:]):  # Skip ID
            print(f"{label}: {value}")
    else:
        print("No data found.")

    print("\n--- INTERNET DATABASE ---")
    cursor.execute("USE internet")
    cursor.execute("SELECT * FROM internet_data ORDER BY timestamp DESC LIMIT 1")
    internet_data = cursor.fetchone()
    if internet_data:
        internet_labels = [
            "Upload Speed", "Download Speed", "Bandwidth Daily",
            "Bandwidth Weekly", "Bandwidth Monthly", "Total Devices", "Latency"
        ]
        for label, value in zip(internet_labels, internet_data[1:]):  # Skip ID
            print(f"{label}: {value}")
    else:
        print("No data found.")

    print("\n--- DEVICES DATABASE ---")
    cursor.execute("USE devices")
    cursor.execute("SELECT * FROM connected_devices ORDER BY timestamp DESC LIMIT 5")  # Show latest 5 devices
    devices_data = cursor.fetchall()
    if devices_data:
        for device in devices_data:
            print(f"Name: {device[1]}, State: {device[2]}, MAC: {device[3]}, IP: {device[4]}, "
                  f"Upload Speed: {device[5]}, Download Speed: {device[6]}, Data Used Today: {device[7]}")
    else:
        print("No devices connected.")

    print("\n--- APPLIANCES DATABASE ---")
    cursor.execute("USE appliances")
    cursor.execute("SELECT * FROM appliance_data ORDER BY start_time DESC LIMIT 5")  # Show latest 5 appliances
    appliances_data = cursor.fetchall()
    if appliances_data:
        for appliance in appliances_data:
            print(f"Name: {appliance[1]}, State: {appliance[2]}, Power: {appliance[3]}, "
                  f"Start Time: {appliance[4]}, End Time: {appliance[5]}")
    else:
        print("No appliances data found.")

    print("\n--- WATCHTOWER DATABASE ---")
    cursor.execute("USE watchtower")
    cursor.execute("SELECT * FROM surveillance ORDER BY timestamp DESC LIMIT 5")  # Show latest 5 entries
    watchtower_data = cursor.fetchall()
    if watchtower_data:
        for entry in watchtower_data:
            print(f"Camera Name: {entry[1]}, Video: [BLOB Data]")
    else:
        print("No surveillance data found.")

# Run the function to read and print data
read_and_print_data()

# Close connection
cursor.close()
conn.close()
