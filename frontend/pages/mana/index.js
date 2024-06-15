

//Setup
const chatConfiguration = {
    name: "chats-manat"
};

const chatMessages = readMessages(chatConfiguration.name);

main();
function main() {
    displayMessages(chatMessages);
}

//  Events
document.getElementById('send_button').addEventListener('click', handleSendMessage);
document.getElementById('back_button').addEventListener('click', () => window.history.back());

//  Functions
function handleSendMessage() {
    const text = document.getElementById("inputbar").value;
    if (!text) { return; }
    document.getElementById("inputbar").value = '';
    createMessage(localStorage.getItem('username'), text, chatMessages);
    updateMessages(chatConfiguration.name, chatMessages);
    displayMessages(chatMessages);
}

function displayMessages(messages) {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
    for (i in messages) {
        const sender = messages[i].sender;
        const message = messages[i].message;
        chat.innerHTML += `<div class="message"><div class="sender"> ${sender} </div> <div class="text"> ${message} </div> <button onclick="deleteMessage(${i})"> Delete</button> </div>`;
    }
}

// CRUD
function createMessage(sender, message, messages) {
    messages.push(
        {
            sender: sender,
            message: message
        }
    )
}

function readMessages(key) {
    const messages = localStorage.getItem(key);
    if (!messages) {
        return [];
    }
    return JSON.parse(messages);
}

function updateMessages(key, messages) {
    localStorage.setItem(key, JSON.stringify(messages));
}

function deleteMessage(index) {
    chatMessages.splice(index,1);
    displayMessages(chatMessages);
    updateMessages(chatConfiguration.name,chatMessages)
}









