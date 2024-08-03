

//Setup
const chatConfiguration = {
    name: "chats-mana",
    api_url: "http://localhost:3000"
};

var chatMessages = [];

main();
async function main() {
    await readMessages();
    displayMessages(chatMessages);
    const chatMenu = document.getElementById("chat")
    chatMenu.scrollTop = chatMenu.scrollHeight
    //Continuos get data
    //setInterval(readMessages,1000)
}

async function getMessagesFromServer() {
    const response = await fetch(`${chatConfiguration.api_url}/rooms/chats-mana`);
    const data = await response.json();
    const messages = [];
    // console.log(data);
    for (msg of data) {
        const newData = {
            sender: msg.author.name,
            message: msg.message,
            id : msg.id
        }
        messages.push(newData);
    }
    // sort
    messages.sort((a,b)=> a.id-b.id);
    console.log(messages)
    return messages;
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
        const id = messages[i].id;
        chat.innerHTML += `<div class="message"><div class="sender"> ${sender} </div> <div class="text"> ${message} </div> <button class="del-button" onclick="deleteMessage(${id})"> Delete</button> </div>`;
    }
}

// CRUD

async function createMessage(sender, message, messages) {
    if(!sender){
        alert("Please enter username.")
        return;
    }
    await fetch(`${chatConfiguration.api_url}/rooms/chats-mana`, 
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

async function readMessages() {
    // const msgFromServer = await getMessagesFromServer();
    // const messages = msgFromServer;
    // console.log(messages)
    // // const messages = localStorage.getItem(key);
    // if (!messages) {
    //     return [];
    // }
    // return (messages);


    chatMessages = await getMessagesFromServer();
    // console.log(chatMessages);
    displayMessages(chatMessages);
}

function updateMessages(key, messages) {

    // localStorage.setItem(key, JSON.stringify(messages));
}

async function deleteMessage(id) {
    if (confirm("Are you sure"+id) == true) {
        await fetch(`${chatConfiguration.api_url}/rooms/chats-mana/${id}`, 
            {
                method: "DELETE",
            });
        await readMessages()
    }
}
// await fetch(`${chatConfiguration.api_url}/rooms/chats-mana`, 
//         {
//             method: "DELTE",
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ message: message, username: sender })
//         });





