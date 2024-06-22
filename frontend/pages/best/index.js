// Setup
const chatConfiguration = {
    name: "chats-best"
};

document.addEventListener("DOMContentLoaded", main);

async function main() {
    document.getElementById('chat-name').innerText = chatConfiguration.name;
    await displayMessages();

    // Event listeners
    document.getElementById('send-button').addEventListener('click', handleSendMessage);
    document.getElementById('back-button').addEventListener('click', () => window.history.back());
}

// Functions
async function handleSendMessage() {
    const text = document.getElementById("inputbox").value;
    const username = localStorage.getItem('username') || 'defaultUser';
    if (!text) { return; }
    document.getElementById("inputbox").value = '';

    await createMessage(chatConfiguration.name, username, text);
    await displayMessages();
}

async function displayMessages() {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';

    const messages = await fetchMessages(chatConfiguration.name);
    for (let i = 0; i < messages.length; i++) {
        const sender = messages[i].author.name;
        const message = messages[i].message;
        chat.innerHTML += `<div class="message"><div class="sender"> ${sender} </div><div class="text"> ${message} </div><button class="del-button" onclick="deleteMessage(${i}, ${messages[i].id})">X</button></div>`;
    }
}

// CRUD Operations
async function createMessage(room, username, message) {
    try {
        await fetch(`http://localhost:3000/rooms/${room}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, username })
        });
    } catch (error) {
        console.error('Error creating message:', error);
    }
}

async function fetchMessages(room) {
    try {
        const response = await fetch(`http://localhost:3000/rooms/${room}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error fetching messages:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}

async function deleteMessage(index, messageId) {
    const room = chatConfiguration.name;
    if (confirm("Are you sure?")) {
        try {
            await fetch(`http://localhost:3000/rooms/${room}/${messageId}`, {
                method: 'DELETE'
            });
            await displayMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }
}
