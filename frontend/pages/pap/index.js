document.getElementById('send-buttom').addEventListener('click',clickEvent);

function clickEvent(){
    var text = document.getElementById('inputbox').value;
    const chat = document.getElementById('chat');
    chat.innerHTML += `<div class="message"> <div class="sender"> username1 </div> <div class="text"> ${text} </div> </div>`
    

}