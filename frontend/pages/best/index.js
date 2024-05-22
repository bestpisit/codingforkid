var UserLogin = "";
const chatMessages = [];

function handleSendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        addMessage(userInput, UserLogin);
        updateConversation();
        document.getElementById('user-input').value = "";
    }
    else {
        alert("Please Input Message");
    }
}

function addMessage(message, user) {
    chatMessages.push(
        {
            user: user,
            message: message
        }
    )
}

document.getElementById('submit-button').addEventListener('click', handleSendMessage);

document.getElementById('backButton').addEventListener('click', function () {
    window.history.back();
});

window.onload = function () {
    const username = localStorage.getItem('username');
    UserLogin = username;
    document.getElementById('username').innerHTML = username;
};

function updateConversation() {
    const conversation = document.getElementById('conversation');
    conversation.innerHTML = null;
    for (msg of chatMessages) {
        conversation.innerHTML += `<div class="chat"><div class="chat-sender">${msg.user} : </div><div class="chat-message">${msg.message}</div</div>`;
    }
}