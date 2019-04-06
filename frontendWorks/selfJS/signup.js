$(document).ready(function () {
    $('#signupbtn').click(function (e) {
        e.stopPropagation()
        const username = $("#name").val();
        const email = $("#email").val();
        const pw = $("#pw").val();
        const rpw = $("#rpw").val();
        console.log(username,pw, rpw, email);
        if(username && pw && email && rpw && pw === rpw) {
            $.post('/login/signup', {
                username: username,
                pw: pw,
                email: email
            }, (data) => {
                console.log('signUp sent', data);
                window.location.href = '/login'
            })
        }
    })
});

