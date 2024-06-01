document.getElementById('send-button').addEventListener('click',clickEvent);

function clickEvent(){
    var text = document.getElementById('inputbox').value;
    addMessage(localStorage.getItem('username'),text)
    chatMessages.push(
        {
        sender : localStorage.getItem('username'),
        message : text
        }
    );
    //add to localstorage
    localStorage.setItem('chats-anda',JSON.stringify(chatMessages));
}

document.getElementById('back-button').addEventListener('click',backEvent);

function backEvent(){
    window.history.back();
}

function addMessage(user,message){
    const chat = document.getElementById('chat');
    chat.innerHTML += `<div class="message"> <div class="sender"> ${user} </div> <div class="text"> ${message} </div> </div>`;
}

//localStorage.getItem('username')

//input
var chatMessages = JSON.parse(localStorage.getItem('chats-anda'));
if(chatMessages == null){
    chatMessages = [];
}

for(let i of chatMessages){
    addMessage(i.sender, i.message)
}

console.log();

//process
// for(let i of chatMessages){
//     console.log(i.sender + " : " + i.message);
// }
// var newMessage = {
//     sender : "Undoo",
//     message : "Helo World!"
// };
// chatMessages.push(newMessage)
// for(let i of chatMessages){
//     console.log(i.sender + " : " + i.message);
// }
// // for(let i in user){
// //     console.log(user[i] + " : " + message[i]);
// // }
// // for(let i of user){
// //     console.log(i);
// // }
// //output

// //function
// function sum(user,message){
//     return user + " : " + message;
// }