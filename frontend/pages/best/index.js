var UserLogin = {};
let chatMessages = [];

const getChat = async () => {
    const response = await fetch('http://localhost:3000/rooms/best/chats');
    const data = await response.json();
    chatMessages = data;
    updateConversation();
    return true;
}

const postChat = async (username,message) => {
    const response = await fetch('http://localhost:3000/rooms/best/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, message })
    });
}

getChat();

async function handleSendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        try{
            await postChat(UserLogin.name,userInput);
            await getChat();
            // addMessage(userInput, UserLogin);
            document.getElementById('user-input').value = "";
        }
        catch(e){
            console.log(e);
        }
    }
    else {
        alert("Please Input Message");
    }
}

function addMessage(message, user) {
    chatMessages.push(
        {
            author: user,
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
    UserLogin = { name: username };
    document.getElementById('username').innerHTML = username;
};

function updateConversation() {
    const conversation = document.getElementById('conversation');
    conversation.innerHTML = null;
    for (msg of chatMessages) {
        conversation.innerHTML += `<div class="chat"><div class="chat-sender">${msg.author.name} : </div><div class="chat-message">${msg.message}</div</div>`;
    }
}