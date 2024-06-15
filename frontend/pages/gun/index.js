//Setup
const chatConfiguration = {
    name: "chats-best"
};

const chatMessages = readMessages(chatConfiguration.name);

main();
function main() {
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
        chat.innerHTML += `<div class="message"> <div class="sender"> ${sender} </div> <div class="text"> ${message} </div> </div>;`
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


// //set up
// //input
// var chatMessages = readMessage();
// console.log

// for (let i of chatMessages) {
//     createMessage(i.sender, i.message);
// }

// //events
// document.getElementById('send-button').addEventListener('click', clickEvent);
// document.getElementById('back-button').addEventListener('click', backEvent);

// //functions
// function clickEvent() {
//     var text = document.getElementById('inputbox').value;
//     createMessage(localStorage.getItem('username'), text);
//     chatMessages.push(
//         {
//             sender: localStorage.getItem('username'),
//             message: text
//         }
//     );
//     //add to localStorage
//     localStorage.setItem('chats-gun', JSON.stringify(chatMessages));

// }

// function backEvent() {
//     window.history.back();
// }


// console.log(localStorage.getItem('chats-gun'));


// function createMessage(user, message) {
//     const chat = document.getElementById('chat');
//     chat.innerHTML += `<div class="message"> <div class="sender"> ${user} </div> <div class="text"> ${message} </div> </div>`;
//     chatMessages.push(
//         {
//             sender: localStorage.getItem('username'),
//             message: message
//         }
//     );
//     updateMessage();
// }

// function readMessage() {
//     const chatData = localStorage.getItem('chats-gun');
//     if (chatData == null) {
//         return [];
//     }
//     else {
//         return JSON.parse(chatData);
//     }
// }

// function updateMessage(messages) {
//     localStorage.setItem('chats-gun', JSON.stringify(messages));
// }

// function deleteMessage(messages) {

// }


// //process

// // for(let i = 0;i<5;i++){
// //     console.log(i)
// // }

// // for(let i in user){
// //     console.log(user[i]+": ",message[i]);
// // }
// // for(let i of user){
// //     console.log(i);
// // }

// //output
// // console.log(sum(user,message));

// //function
// // function sum(user,message){
// //     return user+": "+message;
// // }