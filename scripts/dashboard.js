function showMessage(id) {
    let message = document.getElementById(id);
    message.style.display = "block";
    message.style.animation = "fadeInOut 2s ease-in-out";
    
    setTimeout(() => {
        message.style.display = "none";
    }, 2000); // Hide after 2 seconds
}


document.addEventListener("DOMContentLoaded", () => {
    // Add appliance event
    document.querySelector(".btn-add").addEventListener("click", async () => {
        const name = document.getElementById("name").value;
        const state = document.getElementById("state").value;
        const power = document.getElementById("power").value;
        const start_time = document.getElementById("start_time").value;
        const end_time = document.getElementById("end_time").value;
        const power_level = document.getElementById("power_level").value;

        if (!name || !state || !power || !start_time || !end_time || !power_level) {
            alert("Please fill in all fields.");
            return;
        }

        const applianceData = { name, state, power, start_time, end_time, power_level };

        try {
            const response = await fetch("/addAppliance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(applianceData),
            });

            const result = await response.json();
            if (response.ok) {
                document.getElementById("addStatus").textContent = "Added Successfully!";
                document.getElementById("addStatus").style.color = "green";
            } else {
                document.getElementById("addStatus").textContent = "Failed to Add!";
                document.getElementById("addStatus").style.color = "red";
            }
        } catch (error) {
            console.error("Error adding appliance:", error);
        }
    });

    // Remove appliance event
    document.querySelector(".btn-delete").addEventListener("click", async () => {
        const id = document.getElementById("appliance_id").value;

        if (!id) {
            alert("Please enter an appliance ID.");
            return;
        }

        try {
            const response = await fetch("/removeAppliance", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            const result = await response.json();
            if (response.ok) {
                document.getElementById("removeStatus").textContent = "Deleted Successfully!";
                document.getElementById("removeStatus").style.color = "white";
            } else {
                document.getElementById("removeStatus").textContent = "Failed to Delete!";
                document.getElementById("removeStatus").style.color = "white";
            }
        } catch (error) {
            console.error("Error removing appliance:", error);
        }
    });
});
