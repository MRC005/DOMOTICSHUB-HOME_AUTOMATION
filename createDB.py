import mysql.connector

# MySQL Connection Config
config = {
    "host": "localhost",    # Change if your MySQL server is on another host
    "user": "root",         # Change to your MySQL username
    "password": "password",  # Change to your MySQL password
}

# Connect to MySQL Server
conn = mysql.connector.connect(**config)
cursor = conn.cursor()

# List of Databases
databases = ["power", "internet", "devices", "appliances", "watchtower"]

# Create Databases
for db in databases:
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db}")

# Function to create tables
def create_tables(db_name, table_query):
    cursor.execute(f"USE {db_name}")
    cursor.execute(table_query)

# Power Database Table
create_tables("power", """
    CREATE TABLE IF NOT EXISTS power_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        energy_consumption_kwh FLOAT,
        voltage FLOAT,
        frequency FLOAT,
        apparent_power FLOAT,
        reactive_power FLOAT,
        power_factor FLOAT,
        load_percentage FLOAT,
        total_power FLOAT,
        total_current FLOAT,
        phase1_load_percentage FLOAT,
        phase1_power FLOAT,
        phase1_voltage FLOAT,
        phase1_current FLOAT,
        phase1_frequency FLOAT,
        phase1_power_factor FLOAT,
        phase2_load_percentage FLOAT,
        phase2_power FLOAT,
        phase2_voltage FLOAT,
        phase2_current FLOAT,
        phase2_frequency FLOAT,
        phase2_power_factor FLOAT,
        phase3_load_percentage FLOAT,
        phase3_power FLOAT,
        phase3_voltage FLOAT,
        phase3_current FLOAT,
        phase3_frequency FLOAT,
        phase3_power_factor FLOAT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Internet Database Table
create_tables("internet", """
    CREATE TABLE IF NOT EXISTS internet_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        upload_speed FLOAT,
        download_speed FLOAT,
        bandwidth_daily FLOAT,
        bandwidth_weekly FLOAT,
        bandwidth_monthly FLOAT,
        total_devices INT,
        latency FLOAT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Devices Database Table
create_tables("devices", """
    CREATE TABLE IF NOT EXISTS connected_devices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        state ENUM('ON', 'OFF'),
        mac_address VARCHAR(20) UNIQUE,
        ip_address VARCHAR(20) UNIQUE,
        upload_speed FLOAT,
        download_speed FLOAT,
        data_used_today FLOAT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Appliances Database Table
create_tables("appliances", """
    CREATE TABLE IF NOT EXISTS appliance_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        state ENUM('ON', 'OFF'),
        power FLOAT,
        start_time TIMESTAMP,
        end_time TIMESTAMP
    )
""")

# Watchtower Database Table
create_tables("watchtower", """
    CREATE TABLE IF NOT EXISTS surveillance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        video BLOB,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Close connection
cursor.close()
conn.close()

print("Databases and tables created successfully!")
