//Setup
const chatConfiguration = {
    name: "chats-best"
};

const chatMessages = readMessages(chatConfiguration.name);

main();
function main() {
    document.getElementById('chat-name').innerText = chatConfiguration.name;
    displayMessages(chatMessages);
}

//  Events
document.getElementById('send-button').addEventListener('click', handleSendMessage);
document.getElementById('back-button').addEventListener('click', () => window.history.back());

//  Functions
function handleSendMessage() {
    const text = document.getElementById("inputbox").value;
    if (!text) { return; }
    document.getElementById("inputbox").value = '';
    createMessage(localStorage.getItem('username'), text, chatMessages);
    updateMessages(chatConfiguration.name, chatMessages);
    displayMessages(chatMessages);
}

function displayMessages(messages) {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
    for (i of messages) {
        const sender = i.sender;
        const message = i.message;
        chat.innerHTML += `<div class="message"> <div class="sender"> ${sender} </div> <div class="text"> ${message} </div> </div>`;
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

function deleteMessage() {
    //TODO
}

// function updateMessages(key, messages) {
//     return new Promise((resolve, reject) => {
//         try {
//             localStorage.setItem(key, JSON.stringify(messages));
//             setTimeout(() => {
//                 resolve();
//             }, 1000);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }