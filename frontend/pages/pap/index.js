//Setup
const chatConfiguration = {
    name: "pap",
    api_url: "http://localhost:3000"
};

var chatMessages = [];

main();
async function main() {
    await readMessages();
    displayMessages(chatMessages);
    const chatMenu = document.getElementById("chat")
    chatMenu.scrollTop = chatMenu.scrollHeight;
    //Continuous get data
    //setInterval(readMessages,1000)
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
        const id = messages[i].id ;
        chat.innerHTML += `<div class="message"><div class="sender"> ${sender} </div><div class="text"> ${message} </div><button class="del-buttom" onclick="deleteMessage(${id})">X</button></div>`;
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

async function readMessages() {

    //getMessageFormServer();
    //const messages = localStorage.getItem(key);
    //if (!messages) {
    //    return [];
    //}
    //return(messages);

    chatMessages = await getMessageFormServer();
    //console.log(chatMessages);
    displayMessages(chatMessages);
}

function updateMessages(key, messages) {
    //localStorage.setItem(key, JSON.stringify(messages));

}

async function deleteMessage(id) {
    if (confirm("ขนาดกล้วยของคุณคือ"+id) == true) {
        await fetch(`${chatConfiguration.api_url}/rooms/pap/${id}`,
            {
                method: "DELETE",
            })
        await readMessages();
    }
}

async function getMessageFormServer() {
    const response = await fetch(`${chatConfiguration.api_url}/rooms/pap`)
    const data = await response.json();
    const messages = [];

    //sort

    for (msg of data) {
        const newData = {
            sender: msg.author.name,
            message: msg.message,
            id: msg.id

        }
        messages.push(newData);
    }

    //sort
    messages.sort((a,b)=>a.id-b.id);

    console.log(messages);
    return messages;
}