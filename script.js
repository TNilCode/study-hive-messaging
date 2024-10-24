const messageEl = document.querySelector("#messages");
const inputEl = document.querySelector("#message-input");
const sendBtn = document.querySelector("#send-btn");
const serverNav = document.querySelector("#server-nav");
const imageBtn = document.querySelector("#image-btn");
const imageInput = document.querySelector("#image-input");
const imageChipContainer = document.querySelector("#image-chip-container");
let msgID = 1;
let user = "Anonymous User";
let selectedImage = null;
let selectedImageName = "";

/**
 * Add a new server icon with the given image.
 * @param {string} imgUrl - The URL of the server image.
 */
function addServer(imgUrl) {
    const serverIcon = document.createElement("div");
    serverIcon.classList.add("server-icon");
    serverIcon.innerHTML = `<img src="${imgUrl}" alt="Server icon" />`;
    serverNav.appendChild(serverIcon);
}

function formatTime(date) {
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
}

function addMessage(username = "Anonymous User", text = "", img = "") {
    if (text === "" && img === "") {
        throw new Error('Message is empty!');
    }

    const timestamp = formatTime(new Date());

    const messageHTML = `
        <div class="message" id="msg-${msgID}">
            <img class="profile-picture" src=""/>
            <div class="message-bubble">
                <span class="username">${username}</span>
                ${text ? `<p>${text}</p>` : ""}
                ${img ? `<img src="${img}" class="message-image" /><br/>` : ""}
                <span class="timestamp">${timestamp}</span>
            </div>
        </div>`;

    messageEl.insertAdjacentHTML("beforeend", messageHTML);
    msgID++;
    messageEl.scrollTop = messageEl.scrollHeight;
}

// Send button event
sendBtn.addEventListener("click", () => {
    const messageText = inputEl.value.trim();
    if (messageText || selectedImage) {
        addMessage(user, messageText, selectedImage);
        inputEl.value = "";
        selectedImage = null;
        selectedImageName = "";
        imageInput.value = null;
        clearImageChip();
    }
});

// Allow sending messages with 'Enter' key
inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
        e.preventDefault(); // Prevent newline in input
    }
});

// Image button event to trigger file input
imageBtn.addEventListener("click", () => {
    imageInput.click();
});

// Handle image selection
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            selectedImage = e.target.result;
            selectedImageName = file.name;
            displayImageChip(selectedImageName);
        };
        reader.readAsDataURL(file);
    }
});

// Function to display the image chip
function displayImageChip(filename) {
    clearImageChip(); // Remove existing chip if any

    const chip = document.createElement("div");
    chip.classList.add("image-chip");
    chip.innerHTML = `
        <span>${filename}</span>
        <button class="close-btn">❌</button>
    `;

    // Add event listener to the close button
    chip.querySelector(".close-btn").addEventListener("click", () => {
        selectedImage = null;
        selectedImageName = "";
        imageInput.value = null;
        clearImageChip();
    });

    imageChipContainer.appendChild(chip);
}

// Function to clear the image chip
function clearImageChip() {
    imageChipContainer.innerHTML = "";
}

function updateServerName(name) {
    const serverHeader = document.querySelector(".server-name");
    if (serverHeader) {
        serverHeader.textContent = name;
    }
}

// CHANGE THESE WITH BACKEND
user = "Current User";
addMessage(user, "Hello World!", "");
updateServerName("Untitled Server");
addServer("https://via.placeholder.com/50");
addServer("https://via.placeholder.com/50");
addServer("https://via.placeholder.com/50");
