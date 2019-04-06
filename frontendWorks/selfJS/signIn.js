$(document).ready(function () {
    $('#loginbtn').click(function (e) {
        e.stopPropagation()
        const username = $("#username").val();
        const pw = $("#pw").val();
        console.log(username,pw);
        if(username && pw) {
            $.post('/login/signin', {
                username: username,
                pw: pw
            }, (data) => {
                console.log('signIn sent', data);
                window.location.href = "/dashboard"
            })
        } else {
            console.log("hel")
        }

    })
});

