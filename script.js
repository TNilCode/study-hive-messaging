const messageEl = document.querySelector("#messages");
const inputEl = document.querySelector("#message-input");
const sendBtn = document.querySelector("#send-btn");
let msgID = 1;

function formatTime(date) {
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
}

function addMessage(text = "", img = "", isSent = true) {
    if (text === "" && img === "") {
        throw new Error('Message is empty!');
    }

    const timestamp = formatTime(new Date());

    // Check if the previous message was from the same sender
    const lastMessage = messageEl.lastElementChild;
    const sameSender = lastMessage && lastMessage.classList.contains(isSent ? "sent" : "received");

    if (sameSender) {
        lastMessage.querySelector(".message-bubble").classList.add("bottom");
    }

    // Create the message HTML
    const messageHTML = `
        <div class="message ${isSent ? "sent" : "received"}" id="msg-${msgID}">
            <div class="message-bubble ${sameSender ? "top" : ""}">
                ${img ? `<img src="${img}" alt="Image message" />` : ""}
                ${text ? `<p>${text}</p>` : ""}
                <span class="timestamp">${timestamp}</span>
            </div>
        </div>`;

    messageEl.insertAdjacentHTML("beforeend", messageHTML);
    msgID++;

    // Auto-scroll to the latest message
    messageEl.scrollTop = messageEl.scrollHeight;
}

// Send button click event listener
sendBtn.addEventListener("click", () => {
    const messageText = inputEl.value.trim();
    if (messageText) {
        addMessage(messageText, "", true);
        inputEl.value = ""; // Clear the input field
    }
});

// Allow sending messages with 'Enter' key
inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});


inputEl.addEventListener("keypress", (e) => {
    if (e.key === "`") {
        const messageText = inputEl.value.trim();
    if (messageText) {
        addMessage(messageText, "", false);
        inputEl.value = ""; // Clear the input field
    }
    }
});