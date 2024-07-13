//Setup
const chatConfiguration = {
    name: "pap",
    api_url: "https://codingforkids.eastasia.cloudapp.azure.com"
};

var chatMessages = [];

main();
async function main() {
    chatMessages = await readMessages(chatConfiguration.name);
    displayMessages(chatMessages);
}



//  Events
document.getElementById('send-buttom').addEventListener('click', handleSendMessage);
document.getElementById('backclickevent').addEventListener('click', () => window.history.back());

//  Functions
async function handleSendMessage() {
    const text = document.getElementById("inputbox").value;
    if (!text) { return; }
    document.getElementById("inputbox").value = '';
    await createMessage(localStorage.getItem('username'), text, chatMessages);
    chatMessages = await readMessages(chatConfiguration.name);
    //updateMessages(chatConfiguration.name, chatMessages);
    displayMessages(chatMessages);
}

function displayMessages(messages) {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
    for (i in messages) {
        const sender = messages[i].sender;
        const message = messages[i].message;
        chat.innerHTML += `<div class="message"><div class="sender"> ${sender} </div><div class="text"> ${message} </div><button class="del-buttom" onclick="deleteMessage(${i})">X</button></div>`;
    }
}

// CRUD
async function createMessage(sender, message, messages) {
    if (!sender){
        alert("pls enter Username")
        return;
    };
    await fetch(`${chatConfiguration.api_url}/rooms/pap`,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message, username: sender })
        })
}

async function readMessages(key) {
    getMessageFormServer();

    //const messages = localStorage.getItem(key);
    //if (!messages) {
    //    return [];
    //}
    //return(messages);
    return await getMessageFormServer();

}

function updateMessages(key, messages) {
    //localStorage.setItem(key, JSON.stringify(messages));

}

function deleteMessage(index) {
    //TODO
    if (confirm("ห้ามกดเดียวโดนhack") == true) {
        chatMessages.splice(index, 1);
        displayMessages(chatMessages);
        updateMessages(chatConfiguration.name, chatMessages);
    }
}

async function getMessageFormServer() {
    const response = await fetch(`${chatConfiguration.api_url}/rooms/pap`)
    const data = await response.json();
    const messages = [];
    for (msg of data) {
        const newData = {
            sender: msg.author.name,
            message: msg.message

        }
        messages.push(newData);
    }
    return messages;
}