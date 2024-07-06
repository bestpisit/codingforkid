

//Setup
const chatConfiguration = {
    name: "chats-best"
};

var chatMessages = [];

main();
async function main() {
    chatMessages = await readMessages(chatConfiguration.name);
    displayMessages(chatMessages);
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
        chat.innerHTML += `<div class="message"><div class="sender"> ${sender} </div> <div class="text"> ${message} </div> <button onclick="deleteMessage(${i})"> Delete</button> </div>`;
    }
}

// CRUD
async function createMessage(sender, message, messages) {
    if(!sender){
        alert("Please Enter Your Username");
        return;
    };
    await fetch("http://localhost:3000/rooms/chats-best",
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message, username: sender })
        })
    // messages.push(
    //     {
    //         sender: sender,
    //         message: message
    //     }
    // )
}

async function readMessages(key) {
    // getMessageFromServer();
    // const messages = localStorage.getItem(key);
    // if (!messages) {
    //     return [];
    // }
    // return JSON.parse(messages);
    return await getMessageFromServer();
}

function updateMessages(key, messages) {
    // localStorage.setItem(key, JSON.stringify(messages));
}

async function deleteMessage(index) {
    if (confirm("Are you sure") == true) {
        // chatMessages.splice(index, 1);
        await fetch(`http://localhost:3000/rooms/chats-best/${index}`,
            {
                method: "DELETE",
            })
        chatMessages = await readMessages(chatConfiguration.name);
        displayMessages(chatMessages);
        // updateMessages(chatConfiguration.name, chatMessages)
    }
}

async function getMessageFromServer() {
    const response = await fetch("http://localhost:3000/rooms/chats-best")
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