function $(id){
    return document.getElementById(id);
}

function handleLogin(e){
    e.preventDefault();

    const username = $("username").value;
    const password = $("password").value;

    const userOkay = username.length >= 4 && username.length <= 10;
    const passOkay = password.length > 8;

    if(userOkay){
        if(passOkay){

        }
        else{
            alert('password must be more than 8 characters');
        }

    }
    else{
        alert('username must be between 4-10 characters');
        if(passOkay){
            
        }
        else{
            alert('password must be more than 8 characters');
        }
    }
}

$('form_login').addEventListener('submit',handleLogin);