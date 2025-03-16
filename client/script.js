document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById("csvFile");
    const messageElement = document.getElementById("message");
    const downloadBtn = document.getElementById("downloadBtn");

    if (!fileInput.files.length) {
        messageElement.textContent = "⚠️ Please select a CSV file first.";
        messageElement.style.color = "red";
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.textContent = "✅ File uploaded and processed!";
            messageElement.style.color = "green";
            downloadBtn.style.display = "block"; // Show download button
        } else {
            messageElement.textContent = `⚠️ Error: ${data.message}`;
            messageElement.style.color = "red";
        }
    } catch (error) {
        console.error("Error:", error);
        messageElement.textContent = "❌ Failed to upload. Check console.";
        messageElement.style.color = "red";
    }
});

// ✅ Handle Sending Emails
document.getElementById("sendEmailsBtn").addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/sendEmails", {
            method: "POST",
        });

      

        const data = await response.json();

        if (response.ok) {
            alert("✅ Emails sent successfully!");
        } else {
            alert(`⚠️ Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error sending emails:", error);
        alert("❌ Failed to send emails. Check console for details.");
    }
});

// ✅ Handle Download Button Click
document.getElementById("downloadBtn").addEventListener("click", (event) => {
    event.preventDefault(); // Stops form submission
    setTimeout(() => {
        window.location.href = "http://localhost:5000/download";
    }, 500);
});
