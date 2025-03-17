// https://seatallocation.onrender.com

// document.getElementById("loginBtn").addEventListener("click", () => {
//     const adminUser = document.getElementById("adminUser").value;
//     const adminPass = document.getElementById("adminPass").value;
//     const loginMessage = document.getElementById("loginMessage");

//     // Hardcoded credentials (Replace with actual authentication logic)
//     if (adminUser === "admin" && adminPass === "password123") {
//         loginMessage.textContent = "✅ Login successful!";
//         loginMessage.style.color = "green";

//         // Show Hall & Capacity Input and CSV Containers
//         document.getElementById("adminContainer").style.display = "none";
//         document.getElementById("hallContainer").style.display = "block";
//         document.getElementById("csvContainer").style.display = "block";
//     } else {
//         loginMessage.textContent = "❌ Wrong credentials!";
//         loginMessage.style.color = "red";
//     }
// });

// // Handle Hall & Capacity Submission
// document.getElementById("submitHallBtn").addEventListener("click", async () => {
//     const hallNumber = document.getElementById("hallNumber").value;
//     const hallCapacity = document.getElementById("hallCapacity").value;

//     if (!hallNumber || !hallCapacity) {
//         alert("⚠️ Please enter hall number and capacity.");
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost:5000/setHallCapacity", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ hallNumber, hallCapacity })
//         });

//         const data = await response.json();
//         if (response.ok) {
//             alert("✅ Hall and Capacity Set Successfully!");
//         } else {
//             alert(`⚠️ Error: ${data.message}`);
//         }
//     } catch (error) {
//         console.error("Error setting hall capacity:", error);
//         alert("❌ Failed to set hall capacity. Check console.");
//     }
// });


// ///////////////////////////////////////
// document.getElementById("uploadForm").addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const fileInput = document.getElementById("csvFile");
//     const messageElement = document.getElementById("message");
//     const downloadBtn = document.getElementById("downloadBtn");

//     if (!fileInput.files.length) {
//         messageElement.textContent = "⚠️ Please select a CSV file first.";
//         messageElement.style.color = "red";
//         return;
//     }

//     const formData = new FormData();
//     formData.append("file", fileInput.files[0]);

//     try {
//         const response = await fetch("https://seatallocation.onrender.com/upload", {
//             method: "POST",
//             body: formData,
//         });

//         const data = await response.json();

//         if (response.ok) {
//             messageElement.textContent = "✅ File uploaded and processed!";
//             messageElement.style.color = "green";
//             downloadBtn.style.display = "block"; // Show download button
//         } else {
//             messageElement.textContent = `⚠️ Error: ${data.message}`;
//             messageElement.style.color = "red";
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         messageElement.textContent = "❌ Failed to upload. Check console.";
//         messageElement.style.color = "red";
//     }
// });

// // ✅ Handle Sending Emails
// document.getElementById("sendEmailsBtn").addEventListener("click", async (event) => {
//     event.preventDefault();

//     try {
//         const response = await fetch("https://seatallocation.onrender.com/sendEmails", {
//             method: "POST",
//         });

      

//         const data = await response.json();

//         if (response.ok) {
//             alert("✅ Emails sent successfully!");
//         } else {
//             alert(`⚠️ Error: ${data.message}`);
//         }
//     } catch (error) {
//         console.error("Error sending emails:", error);
//         alert("❌ Failed to send emails. Check console for details.");
//     }
// });

// // ✅ Handle Download Button Click
// document.getElementById("downloadBtn").addEventListener("click", (event) => {
//     event.preventDefault(); // Stops form submission
//     setTimeout(() => {
//         window.location.href = "https://seatallocation.onrender.com/download";
//     }, 500);
// });

document.addEventListener("DOMContentLoaded", () => {
    const adminContainer = document.getElementById("adminContainer");
    const dashboard = document.getElementById("dashboard");
    const logoutBtn = document.getElementById("logoutBtn");

    // Check if admin is already logged in
    if (localStorage.getItem("isAdminLoggedIn") === "true") {
        showAdminDashboard();
    }

    document.getElementById("loginBtn").addEventListener("click", () => {
        const adminUser = document.getElementById("adminUser").value.trim();
        const adminPass = document.getElementById("adminPass").value.trim();
        const loginMessage = document.getElementById("loginMessage");

        // Hardcoded credentials (Replace with real authentication)
        if (adminUser === "admin" && adminPass === "password123") {
            loginMessage.textContent = "✅ Login successful!";
            loginMessage.style.color = "green";

            // Store login state in localStorage
            localStorage.setItem("isAdminLoggedIn", "true");

            // Show the dashboard & hide login form
            showAdminDashboard();
        } else {
            loginMessage.textContent = "❌ Wrong credentials!";
            loginMessage.style.color = "red";
        }
    });

    // Function to show admin dashboard & hide login form
    function showAdminDashboard() {
        adminContainer.style.display = "none";
        dashboard.style.display = "block";
    }

    // Logout Functionality
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isAdminLoggedIn");
        location.reload(); // Refresh page to reset state
    });

    document.getElementById("submitHallBtn").addEventListener("click", async () => {
        const hallNumber = document.getElementById("hallNumber").value.trim();
        const hallCapacity = document.getElementById("hallCapacity").value.trim();

        if (!hallNumber || !hallCapacity || isNaN(hallNumber) || isNaN(hallCapacity) || hallNumber <= 0 || hallCapacity <= 0) {
            alert("⚠️ Please enter a valid hall number and capacity.");
            return;
        }

        try {
            const response = await fetch("https://seatallocation.onrender.com/setHallCapacity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hallNumber: Number(hallNumber), hallCapacity: Number(hallCapacity) })
            });

            const data = await response.json();
            if (response.ok) {
                alert("✅ Hall and Capacity Set Successfully!");
            } else {
                alert(`⚠️ Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error setting hall capacity:", error);
            alert("❌ Failed to set hall capacity. Check console.");
        }
    });

    document.getElementById("uploadForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const fileInput = document.getElementById("csvFile");
        const messageElement = document.getElementById("message");

        if (!fileInput.files.length) {
            messageElement.textContent = "⚠️ Please select a CSV file first.";
            messageElement.style.color = "red";
            return;
        }

        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        try {
            const response = await fetch("https://seatallocation.onrender.com/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            messageElement.textContent = response.ok ? "✅ File uploaded and processed!" : `⚠️ Error: ${data.message}`;
            messageElement.style.color = response.ok ? "green" : "red";
        } catch (error) {
            console.error("Error:", error);
            messageElement.textContent = "❌ Failed to upload. Check console.";
            messageElement.style.color = "red";
        }
    });

    document.getElementById("sendEmailsBtn").addEventListener("click", async () => {
        try {
            const response = await fetch("https://seatallocation.onrender.com/sendEmails", { method: "POST" });
            const data = await response.json();
            alert(response.ok ? "✅ Emails sent successfully!" : `⚠️ Error: ${data.message}`);
        } catch (error) {
            console.error("Error sending emails:", error);
            alert("❌ Failed to send emails. Check console.");
        }
    });

    document.getElementById("downloadBtn").addEventListener("click", () => {
        setTimeout(() => {
            window.location.href = "https://seatallocation.onrender.com/download";
        }, 500);
    });
});
