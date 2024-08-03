//Setup
const chatConfiguration = {
    name: "chats-anda",
    api_url: "http://localhost:3000"
};

var chatMessages = [];
var befChat = [];

main();
async function main() {
    await readMessages();
    
    //Continuous Get Data
    // setInterval(readMessages,1000)

    console.log(chatMessages)

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
    await readMessages();
    //updateMessages(chatConfiguration.name, chatMessages);
    displayMessages(chatMessages);
}

function displayMessages(messages) {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
    for (i in messages) {
        const sender = messages[i].sender;
        const message = messages[i].message;
        const id = messages[i].id;
        chat.innerHTML += `<div class="message"><div class="sender"> ${sender} </div><div class="text"> ${message} </div><button class="del-button" onclick="deleteMessage(${id})"> メ </button></div>`;
    }
}

// CRUD
async function createMessage(sender, message, messages) {
    if(!sender){
        alert("plesae enter your username")
        return;
    };
    await fetch(`${chatConfiguration.api_url}/rooms/chats-anda`,
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
    befChat = chatMessages?.map(msg=>msg);
    chatMessages = await getMessageFromServer();

    //console.log(chatMessages)

    displayMessages(chatMessages);

    if(befChat?.length != chatMessages?.length){
        const chatMenu = document.getElementById("chat");
    chatMenu.scrollTop = chatMenu.scrollHeight;
    }
    
}

function updateMessages(key, messages) {
    //localStorage.setItem(key, JSON.stringify(messages));
    
}

async function deleteMessage(id) {
    if(confirm("Sure Yang?"+id) == true){
        await fetch(`${chatConfiguration.api_url}/rooms/chats-anda/${id}`,
            {
                method: "DELETE",
            })
            await readMessages();
    }
} 

async function getMessageFromServer(){
    const response = await fetch(`${chatConfiguration.api_url}/rooms/chats-anda`)
    const data = await response.json();
    const msgz = []
    console.log(data);
    for(msg of data){
        const newData = {
            id: msg.id,
            sender: msg.author.name,
            message: msg.message
        }
        msgz.push(newData)
    }

    //sort
    msgz.sort((a,b)=>a.id-b.id);

    console.log(msgz);

    return msgz;
}