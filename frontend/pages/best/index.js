//  Setup
const chatConfiguration = {
    name: "chats-best"
};

const chatMessages = [
    {
        sender: "best",
        message: "google 1"
    },
    {
        sender: "best",
        message: "google 2"
    }
];

displayMessages(chatMessages);

//  Events
document.getElementById('send-button').addEventListener('click', handleSendMessage);
document.getElementById('back-button').addEventListener('click', () => {
    window.history.back();
});

//  Functions

function handleSendMessage() {
    const text = document.getElementById("inputbox").value;
    document.getElementById("inputbox").value = '';
    createMessage(localStorage.getItem('user'), text, chatMessages);
    console.log(chatMessages);
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













// // Setup
// var chatMessages = readMessage();
// renderMessages(chatMessages);

// //  Events
// document.getElementById('send-button').addEventListener('click', clickEvent);
// document.getElementById('back-button').addEventListener('click', backEvent);

// // Functions
// function createMessage(user, message) {
//     const chat = document.getElementById('chat');
//     chat.innerHTML += `<div class="message"> <div class="sender"> ${user} </div> <div class="text"> ${message} </div> </div>`;
//     chatMessages.push({
//         sender: user,
//         message: message
//     });
//     console.log(JSON.stringify(chatMessages));
//     updateMessage(chatMessages);
// }

// function renderMessages(messages) {
//     const chat = document.getElementById('chat');
//     chat.innerHTML = ''; // Clear chat
//     messages.forEach(i => {
//         chat.innerHTML += `<div class="message"> <div class="sender"> ${i.sender} </div> <div class="text"> ${i.message} </div> </div>`;
//     });
// }

// function readMessage() {
//     return JSON.parse(localStorage.getItem("chats-best")) || [];
// }

// function updateMessage(messages) {
//     localStorage.setItem('chats-best', JSON.stringify(messages));
// }

// function clickEvent() {
//     var text = document.getElementById('inputbox').value;
//     if (text.trim() !== '') { // Ensure not adding empty messages
//         createMessage(localStorage.getItem('username'), text);
//     }
//     document.getElementById('inputbox').value = ''; // Clear the input box
// }

// function backEvent() {
//     window.history.back();
// }

// // To prevent infinite loop
// if (!localStorage.getItem('initialized')) {
//     localStorage.setItem('initialized', 'true');
//     updateMessage(chatMessages);
// } else {
//     renderMessages(chatMessages);
// }