//Setup
const chatConfiguration = {
    name: "chats-gun",
    api_url: "http://localhost:3000"
};

var chatMessages = [];


main();
async function main() {
    await readMessages();
    
    //Continuous Get Data
    //setInterval(readMessages,1000)

    const chatMenu = document.getElementById("chat");
    chatMenu.scrollTop = chatMenu.scrollHeight;
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
        const id = messages[i].id;
        chat.innerHTML += `<div class="message"><div class="sender"> ${sender} </div><div class="text"> ${message} </div><button class="del-button" onclick="deleteMessage(${id})">x</button></div>`;
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

async function readMessages() {
    // const messages = localStorage.getItem(key);
    // if (!messages) {
    //     return [];
    // }
    // return JSON.parse(messages);
    chatMessages = await getMessageFromServer();
    //console.log(chatMessages);
    displayMessages(chatMessages);
    
}

function updateMessages(key, messages) {
    // localStorage.setItem(key, JSON.stringify(messages));
    
}

async function deleteMessage(id) {
    if (confirm("Are you sure?"+ id) == true) {
        await fetch(`${chatConfiguration.api_url}/rooms/gun/${id}`,
            {
                method: "DELETE"
            })
        await readMessages();
    }
}

async function getMessageFromServer() {
    const response = await fetch(`${chatConfiguration.api_url}/rooms/gun`);
    const data = await response.json();
    const messages = [];
    // console.log(data);
    //sort


    for (msg of data) {
        const newData = {
            sender: msg.author.name,
            message: msg.message,
            id: msg.id
        }
        messages.push(newData)
    }

    //sort
    messages.sort((a,b)=>a.id-b.id);

    // console.log(messages);

    return messages;
}