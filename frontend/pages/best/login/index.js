function $(id){
    return document.getElementById(id);
}

async function handleLogin(e){
    e.preventDefault();

    const username = $("username").value;
    const password = $("password").value;

    const userOkey = username.length >= 4 && username.length <= 20;
    const passOkey = password.length >= 8;

    if(userOkey){
        if(passOkey){
            try {
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                if(response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    alert("Login successful!");
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                alert("Error during login. Please try again.");
            }
        }
        else{
            alert("Password must be more than 8 alphabets");
        }
    }
    else{
        if(passOkey){
            alert("Username must be between 4-10 alphabets");
        }
        else{
            alert("Username must be between 4-10 alphabets And Password must be more than 8 alphabets");
        }
    }
}

$("formlogin").addEventListener('submit',handleLogin);