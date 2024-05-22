document.getElementById('username').addEventListener('input', function (event) {
    var username = event.target.value;
    localStorage.setItem('username',username);
});

window.onload = function () {
    var username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username').value = username;
    }
};