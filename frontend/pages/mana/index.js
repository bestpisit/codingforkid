document.getElementById('send_button').addEventListener('click',clickEvent);

function clickEvent(){
    var text = document.getElementById('inputbar').value;
    addMessage(localStorage.getItem('username'),text);
    chatMessages.push(
        {sender : localStorage.getItem('username'), message : text });
//add to local storage
    localStorage.setItem('chats-Mana',JSON.stringify(chatMessages));
}

function addMessage(user,message){
    const chat = document.getElementById('chat');
    chat.innerHTML += `<div class = "message"> <div class="sender"> ${user} </div> <div class="text"> ${message} </div> </div>`;
}

document.getElementById('back_button').addEventListener('click',()=>{ window.history.back()});


var chatMessages = JSON.parse(localStorage.getItem('chats-Mana'));
if (chatMessages == null){
    chatMessages = [   ]
}

for(let i of chatMessages){
    addMessage(i.sender,i.message);
}

console.log()