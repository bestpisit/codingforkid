document.getElementById('send-buttom').addEventListener('click',clickEvent);

function clickEvent(){
    var text = document.getElementById('inputbox').value;
    addMessage(localStorage.getItem('username'),text);
    chatmessage.push(
        {
            sender: localStorage.getItem('username'),
            message: text
        }
    )
    //add to localstorage
    localStorage.setItem('chats-pap',JSON.stringify(chatmessage));
}

function addMessage(user,message){
    const chat = document.getElementById('chat');
    chat.innerHTML += `<div class="message"> <div class="sender"> ${user} </div> <div class="text"> ${message} </div> </div>`
}

document.getElementById('backclickevent').addEventListener('click',clickbackEvent);

function clickbackEvent(){
    window.history.back();
}


var chatmessage = JSON.parse(localStorage.getItem('chats-pap'));
if(chatmessage == null){
    chatmessage = [];
}

for(let i of chatmessage){
    addMessage(i.sender,i.message)
}

