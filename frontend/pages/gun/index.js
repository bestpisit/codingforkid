//Setup
const chatConfiguration = {
    name: "chats-gun",
    api_url: "https://codingforkids.eastasia.cloudapp.azure.com"
};

var chatMessages = [];


main();
async function main() {
    chatMessages = await readMessages(chatConfiguration.name)
    displayMessages(chatMessages);
}

async function getMessageFromServer() {
    const response = await fetch(`${chatConfiguration.api_url}/rooms/gun`);
    const data = await response.json();
    const message = []
    for (msg of data) {
        const newData = {
            sender: msg.author.name,
            message: msg.message
        }
        message.push(newData)
    }
    return message
}



//  Events
document.getElementById('send-button').addEventListener('click', handleSendMessage);
document.getElementById('back-button').addEventListener('click', () => window.history.back());

//  Functions
async function handleSendMessage() {
    const text = document.getElementById("inputbox").value;
    if (!text) { return; }
    document.getElementById("inputbox").value = '';
    await createMessage(localStorage.getItem('username'), text, chatMessages);
    chatMessages = await readMessages(chatConfiguration.name);
    // updateMessages(chatConfiguration.name, chatMessages);
    displayMessages(chatMessages);
}

function displayMessages(messages) {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
    for (i in messages) {
        const sender = messages[i].sender;
        const message = messages[i].message;
        chat.innerHTML += `<div class="message"><div class="sender"> ${sender} </div><div class="text"> ${message} </div><button class="del-button" onclick="deleteMessage(${i})">x</button></div>`;
    }
}

// CRUD
async function createMessage(sender, message, messages) {
    if (!sender) {
        alert("Name please");
        return;
    };
    await fetch(`${chatConfiguration.api_url}/rooms/gun`,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message, username: sender })
        })
}

async function readMessages(key) {
    // const messages = localStorage.getItem(key);
    // if (!messages) {
    //     return [];
    // }
    // return JSON.parse(messages);
    return await getMessageFromServer();
}

function updateMessages(key, messages) {
    // localStorage.setItem(key, JSON.stringify(messages));
    u
}

function deleteMessage(index) {
    if (confirm("Are you sure?") == true) {

        chatMessages.splice(index, 1);
        displayMessages(chatMessages);
        updateMessages(chatConfiguration.name, chatMessages);
    }
}

