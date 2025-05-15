import mysql.connector
import random
import datetime
import time

# MySQL Connection Config
config = {
    "host": "localhost",
    "user": "root",
    "password": "password",
    "database": "power",  # Default database to connect initially
}

def get_db_connection():
    """Establish a new database connection."""
    return mysql.connector.connect(**config)

# Function to insert random data
def insert_random_data(conn, cursor):
    try:
        # Switch to power database
        cursor.execute("USE power")

        # Insert into power_data
        cursor.execute("""
            INSERT INTO power_data (
                energy_consumption_kwh, voltage, frequency, apparent_power, reactive_power, 
                power_factor, load_percentage, total_power, total_current,
                phase1_load_percentage, phase1_power, phase1_voltage, phase1_current, phase1_frequency, phase1_power_factor,
                phase2_load_percentage, phase2_power, phase2_voltage, phase2_current, phase2_frequency, phase2_power_factor,
                phase3_load_percentage, phase3_power, phase3_voltage, phase3_current, phase3_frequency, phase3_power_factor
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            round(random.uniform(200, 1000), 2),
            round(random.uniform(210, 250), 2),
            round(random.uniform(49, 51), 2),
            round(random.uniform(500, 1500), 2),
            round(random.uniform(100, 500), 2),
            round(random.uniform(0.8, 1.0), 2),
            round(random.uniform(30, 100), 2),
            round(random.uniform(0, 50), 2),
            round(random.uniform(10, 50), 2),
            *[round(random.uniform(10, 50), 2) for _ in range(18)]
        ))

        # Switch to internet database
        cursor.execute("USE internet")

        # Insert into internet_data
        cursor.execute("""
            INSERT INTO internet_data (
                upload_speed, download_speed, bandwidth_daily, bandwidth_weekly, bandwidth_monthly, total_devices, latency
            ) VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            round(random.uniform(10, 100), 2),
            round(random.uniform(50, 500), 2),
            round(random.uniform(1, 50), 2),
            round(random.uniform(50, 500), 2),
            round(random.uniform(200, 2000), 2),
            random.randint(5, 50),
            round(random.uniform(5, 50), 2)
        ))

        # Switch to devices database
        # cursor.execute("USE devices")

        # Generate unique IP
        # ip_address = f"192.168.1.{random.randint(2, 255)}"

        # cursor.execute("""
        #     INSERT INTO connected_devices (
        #         name, state, mac_address, ip_address, upload_speed, download_speed, data_used_today
        #     ) VALUES (%s, %s, %s, %s, %s, %s, %s)
        #     ON DUPLICATE KEY UPDATE 
        #     state=VALUES(state), upload_speed=VALUES(upload_speed), 
        #     download_speed=VALUES(download_speed), data_used_today=VALUES(data_used_today)
        # """, (
        #     random.choice(["Laptop", "Phone", "Tablet", "Desktop"]),
        #     random.choice(["ON", "OFF"]),
        #     "02:42:ac:11:" + ":".join([f"{random.randint(10,99)}" for _ in range(2)]),
        #     ip_address,
        #     round(random.uniform(1, 50), 2),
        #     round(random.uniform(10, 100), 2),
        #     round(random.uniform(0.1, 5), 2)
        # ))


        # Switch to appliances database
        # cursor.execute("USE appliances")

        # # Insert into appliance_data
        # start_time = datetime.datetime.now() - datetime.timedelta(minutes=random.randint(10, 120))
        # end_time = start_time + datetime.timedelta(minutes=random.randint(10, 120))

        # cursor.execute("""
        #     INSERT INTO appliance_data (name, state, power, start_time, end_time)
        #     VALUES (%s, %s, %s, %s, %s)
        # """, (
        #     random.choice(["Fan", "Lights"]),
        #     random.choice(["ON", "OFF"]),
        #     round(random.uniform(100, 2000), 2),
        #     start_time,
        #     end_time
        # ))

        # # Switch to watchtower database
        # cursor.execute("USE watchtower")

        # # Insert into surveillance (Dummy entry for now)
        # cursor.execute("""
        #     INSERT INTO surveillance (name, video)
        #     VALUES (%s, %s)
        # """, (
        #     "Camera " + str(random.randint(1, 10)),
        #     None
        # ))

        # Commit the transaction (FIXED: Now correctly using conn.commit())
        conn.commit()
        print("Random data inserted successfully!")

    except mysql.connector.IntegrityError as e:
        print(f"Skipping duplicate entry: {e}")

    except Exception as e:
        print(f"Error inserting data: {e}")

# Main loop
while True:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        insert_random_data(conn, cursor)
        cursor.close()
        conn.close()
        time.sleep(1)

    except mysql.connector.Error as e:
        print(f"Database connection error: {e}. Retrying in 5 seconds...")
        time.sleep(5)
