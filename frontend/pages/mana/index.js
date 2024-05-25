document.getElementById('send_button').addEventListener('click',clickEvent);

function clickEvent(){
    var text = document.getElementById('inputbar').value;
    const chat = document.getElementById('chat');
    chat.innerHTML += `<div class = "message"> <div class="sender"> Anda </div> <div class="text"> ${text} </div> </div>`;
}