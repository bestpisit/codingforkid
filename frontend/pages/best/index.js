

//Setup
const chatConfiguration = {
    name: "chats-best",
    api_url: "https://codingforkids.eastasia.cloudapp.azure.com"
};

var chatMessages = [];

main();
async function main() {
    await readMessages();
    displayMessages(chatMessages);
    const chatMenu = document.getElementById("chat");
    chatMenu.scrollTop = chatMenu.scrollHeight;

    //Continuous Get Data
    setInterval(readMessages,1000);
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
    await readMessages();
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
    await fetch(`${chatConfiguration.api_url}/rooms/chats-best`,
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

async function readMessages() {
    // getMessageFromServer();
    // const messages = localStorage.getItem(key);
    // if (!messages) {
    //     return [];
    // }
    // return JSON.parse(messages);
    chatMessages = await getMessageFromServer();
    displayMessages(chatMessages);
}

function updateMessages(key, messages) {
    // localStorage.setItem(key, JSON.stringify(messages));
}

async function deleteMessage(index) {
    if (confirm("Are you sure") == true) {
        // chatMessages.splice(index, 1);
        await fetch(`${chatConfiguration.api_url}/rooms/chats-best/${index}`,
            {
                method: "DELETE",
            })
        await readMessages();
        displayMessages(chatMessages);
        // updateMessages(chatConfiguration.name, chatMessages)
    }
}

async function getMessageFromServer() {
    const response = await fetch(`${chatConfiguration.api_url}/rooms/chats-best`)
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