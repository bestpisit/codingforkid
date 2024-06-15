//  Configuration
const chatConfiguration = {
    name: 'chats-best',
};
var chatMessages = readMessages();
displayMessages();

//  Events
document.getElementById('send-button').addEventListener('click', handleSendMessage);
document.getElementById('back-button').addEventListener('click', () => window.history.back());


//  Functions CRUD
function createMessage(user, message) {
    chatMessages.push({
        sender: user,
        message: message
    });
}

function readMessages() {
    return JSON.parse(localStorage.getItem(chatConfiguration.name)) || [];
}

function updateMessages() {
    localStorage.setItem(chatConfiguration.name, JSON.stringify(chatMessages));
}

function deleteMessage(index) {
    chatMessages.splice(index, 1);
}

function displayMessages() {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
    chatMessages.map((message,i) => {
        chat.innerHTML += `<div class="message"> <div class="sender"> ${message.sender} </div> <div class="text"> ${message.message} </div> <button onclick="handleDeleteMessage(${i})"> X </button> </div>`;
    });
}

function handleSendMessage() {
    const input = document.getElementById('inputbox');
    var text = input.value;
    input.value = '';  // Clear the input field
    createMessage(localStorage.getItem('username'), text);
    displayMessages();
    updateMessages();
}

function handleDeleteMessage(index){
    deleteMessage(index);
    displayMessages();
    updateMessages();
}
