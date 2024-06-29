

//Setup
const chatConfiguration = {
    name: "chats-mana"
};

var chatMessages = [];

main();
async function main() {
    chatMessages = await readMessages(chatConfiguration.name);
    displayMessages(chatMessages);
}

async function getMessagesFromServer() {
    const response = await fetch("http://localhost:3000/rooms/chats-mana");
    const data = await response.json();
    const message = [];
    for (msg of data) {
        const newData = {
            sender: msg.author.name,
            message: msg.message
        }
        message.push(newData)
    }
    return message;
}

//  Events
document.getElementById('send_button').addEventListener('click', handleSendMessage);
document.getElementById('back_button').addEventListener('click', () => window.history.back());

//  Functions
async function handleSendMessage() {
    const text = document.getElementById("inputbar").value;
    if (!text) { return; }
    document.getElementById("inputbar").value = '';
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
        chat.innerHTML += `<div class="message"><div class="sender"> ${sender} </div> <div class="text"> ${message} </div> <button class="del-button" onclick="deleteMessage(${i})"> Delete</button> </div>`;
    }
}

// CRUD
async function createMessage(sender, message, messages) {
    if(!sender){
        alert("Please enter username.")
        return;
    }
    await fetch("http://localhost:3000/rooms/chats-mana", 
    {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message, username: sender })
    });
    // messages.push(
    //     {
    //         sender: sender,
    //         message: message
    //     }
    // )

}

async function readMessages(key) {
    // const msgFromServer = await getMessagesFromServer();
    // const messages = msgFromServer;
    // console.log(messages)
    // // const messages = localStorage.getItem(key);
    // if (!messages) {
    //     return [];
    // }
    // return (messages);
    return await getMessagesFromServer();

}

function updateMessages(key, messages) {

    // localStorage.setItem(key, JSON.stringify(messages));
}

async function deleteMessage(index) {
    if (confirm("Are you sure") == true) {
        // chatMessages.splice(index, 1);
        await fetch("http://localhost:3000/rooms/chats-mana", 
        {
            method: "DELTE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message, username: sender })
        });
        displayMessages(chatMessages);
        // updateMessages(chatConfiguration.name, chatMessages)
    }
}






