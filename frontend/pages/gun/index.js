document.getElementById('send-button').addEventListener('click',clickEvent);

function clickEvent(){
    var text = document.getElementById('inputbox').value;
    const chat = document.getElementById('chat');
    chat.innerHTML += `<div class="message"> <div class="sender"> The </div> <div class="text"> ${text} </div> </div>`;

}