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
    localStorage.setItem('chats-gun',JSON.stringify(chatMessages));

}

function addMessage(user,message){
    const chat = document.getElementById('chat');
    chat.innerHTML += `<div class="message"> <div class="sender"> ${user} </div> <div class="text"> ${message} </div> </div>`;
}

document.getElementById('back-button').addEventListener('click',backEvent);

function backEvent(){
    window.history.back();
}

//input
var chatMessages = JSON.parse(localStorage.getItem('chats-gun'));

for(let i of chatMessages){
    addMessage(i.sender,i.message);
}

console.log(localStorage.getItem('chats-gun'));
if(chatMessages == null){
    chatMessages = [];
}


//process

// for(let i = 0;i<5;i++){
//     console.log(i)
// }

// for(let i in user){
//     console.log(user[i]+": ",message[i]);
// }
// for(let i of user){
//     console.log(i);
// }

//output
// console.log(sum(user,message));

//function
// function sum(user,message){
//     return user+": "+message;
// }