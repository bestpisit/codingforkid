document.getElementById('send-button').addEventListener('click',clickEvent);

function clickEvent(){
    var text = document.getElementById('inputbox').value;
    addMessage(localStorage.getItem('username'),text);
    chatMessages.push(
        {
            sender: localStorage.getItem('username'),
            message: text
        }
    );
    //add to localStorage
    localStorage.setItem('chats-best',JSON.stringify(chatMessages));
}

function addMessage(user,message){
    const chat = document.getElementById('chat');
    chat.innerHTML += `<div class="message"> <div class="sender"> ${user} </div> <div class="text"> ${message} </div> </div>`;
}

document.getElementById('back-button').addEventListener('click',backEvent);

function backEvent(){
    window.history.back();
}

//camelCase

//input

var chatMessages = JSON.parse(localStorage.getItem('chats-best'));
if(chatMessages == null){
    chatMessages = [];
}

for(let i of chatMessages){
    addMessage(i.sender,i.message);
}