

//Setup
const chatConfiguration = {
    name: "chats-best",
    api_url: "http://localhost:3000"
};

var chatMessages = [];

main();
async function main() {
    await readMessages();
    displayMessages(chatMessages);
    const chatMenu = document.getElementById("chat");
    chatMenu.scrollTop = chatMenu.scrollHeight;

    //Continuous Get Data
    // setInterval(readMessages,1000);
}

//  Events
document.getElementById('send-button').addEventListener('click', handleSendMessage);
document.getElementById('back-button').addEventListener('click', () => window.history.back());

//  Functions
async function handleSendMessage() {
    const text = document.getElementById("inputbox").value;
    if (!text) { return; }
    document.getElementById("inputbox").value = '';
    await createMessage(localStorage.getItem('username'), text, chatMessages);
    await readMessages();
    // updateMessages(chatConfiguration.name, chatMessages);
    displayMessages(chatMessages);
}

function displayMessages(messages) {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
    for (i in messages) {
        const sender = messages[i].sender;
        const message = messages[i].message;
        const id = messages[i].id ;
        chat.innerHTML += `<div class="message"><div class="sender"> ${sender} </div> <div class="text"> ${message} </div> <button onclick="deleteMessage(${id})"> Delete</button> </div>`;
    }
}

// CRUD
async function createMessage(sender, message, messages) {
    if(!sender){
        alert("Please Enter Your Username");
        return;
    };
    await fetch(`${chatConfiguration.api_url}/rooms/chats-best`,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({ message: message, username: sender })
        })
    // messages.push(
    //     {
    //         sender: sender,
    //         message: message
    //     }
    // )
}

async function readMessages() {
    // getMessageFromServer();
    // const messages = localStorage.getItem(key);
    // if (!messages) {
    //     return [];
    // }
    // return JSON.parse(messages);
    chatMessages = await getMessageFromServer();
    // console.log(chatMessages);
    displayMessages(chatMessages);
}

function updateMessages(key, messages) {
    // localStorage.setItem(key, JSON.stringify(messages));
}

async function deleteMessage(id) {
    if (confirm("Are you sure "+id) == true) {
        await fetch(`${chatConfiguration.api_url}/rooms/chats-best/${id}`,
            {
                method: "DELETE",
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        await readMessages();
    }
}

// await fetch(`${chatConfiguration.api_url}/rooms/chats-best/${index}`,
//     {
//         method: "DELETE",
//     })
// await readMessages();

async function getMessageFromServer() {
    await fetch(`${chatConfiguration.api_url}/auth/me`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const response = await fetch(`${chatConfiguration.api_url}/rooms/chats-best`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await response.json();
    const messages = [];

    for (msg of data) {
        const newData = {
            sender: msg.author.name,
            message: msg.message,
            id: msg.id
        }
        messages.push(newData);
    }

    const arr = [5,2,1,3,4];
    console.log(arr);

    //sort
    let swap = true;
    while(swap==true){
        swap=false;
        for(let i=0;i<arr.length-1;i++){
            if(arr[i] > arr[i+1]){
                //swap
                let hold = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = hold;
                swap=true;
            }
        }
    }

    console.log(arr);
    messages.sort((a,b)=>a.id-b.id);



    // console.log(messages);


    return messages;
}