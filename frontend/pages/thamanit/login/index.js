function $(id){
    return document.getElementById(id);
}

function handleLogin(e){
    e.preventDefault();
    const username = $("username").value;
    const password = $("password").value;

    const userOkey = username.length > 4 && username.length <= 10;
    const passOkey = password.length >= 8;

    if(userOkey){
        if(passOkey){

        }
        else{
            alert("Password must be more than or equal to 8 alphabets")
        }
    }
    else{
        if(passOkey){
            alert("Username must be between 4-10 alphabets")
        }
        else{
            alert("Username must be between 4-10 alphabets & Password must be more than or equal to 8 alphabets")
        }
    }
}

$("formlogin").addEventListener('submit',handleLogin);