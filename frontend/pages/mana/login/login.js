function    $(id){
    return document.getElementById(id);
}

function handleLogin(e){
    e.preventDefault();

    const username = $("username").value;
    const password = $("password").value;

    console.log(username,password)
    const userOkay = username.length >=4 && username.length <= 10;
    const passOkay = password.length >= 8;

    if(userOkay){
        if(passOkay){
        }
        else { 
            alert("Password must be atleast 8")
        }
    }
    else{
        if(passOkay){
            alert("Username must be between 4-10")
        }
        else{
            alert("Username must be between 4-10 and Password must be atleast 8")
        }
    }
}

$("formlogin").addEventListener('submit',handleLogin);