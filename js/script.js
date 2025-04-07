// script.js

const botToken = "7905336428:AAGF1Y1tLnywbCTw_l4VmXUhrpxCY-2175Q";  // Your Telegram Bot Token
const chatId = -1002344169379; // Your Telegram Group Chat ID

function sendToTelegram(formData) {
    const selectedServices = formData.services.join(", ");

    const message = `
📝 New Form Submission:
--------------------------
👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
💬 Message: ${formData.message}
🛠️ Services: ${selectedServices}
`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown"
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            document.getElementById("successMessage").innerText = "✅ Form submitted successfully!";
            document.getElementById("successMessage").style.display = "block";
        } else {
            alert("❌ Failed to send message to Telegram.");
            console.error(data);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("❌ There was an error submitting the form.");
    });
}

document.querySelector(".contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
        services: Array.from(form.querySelector("select[name='services[]']").selectedOptions).map(opt => opt.value)
    };

    sendToTelegram(formData);
});
