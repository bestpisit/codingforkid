function $(id){
    return document.getElementById(id);
}

function handleLogin(e){
    e.preventDefault();

    const username = $("username").value
    const password = $("password").value

    alert(password,username)

    const userOKey = username.length >= 4 && username.length < 10;
    const passOKey = password.length >= 8;

    if(userOKey){
        if(passOKey){

        }
        else{
            alert("Password must be more than 8 alphabets")
        }
    }
    else{
        if(passOKey){
            alert("Username must be between 4 - 10 alphabets")
        }
        else{
            alert("Username must be between 4 - 10 alphabets and Password must be more than 8 alphabets")
        }
    }
}

$("formlogin").addEventListener('submit', handleLogin)