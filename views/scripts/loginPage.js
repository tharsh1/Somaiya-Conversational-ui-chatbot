
$('.login_btn').click(function () {
    let password = Sha256.hash($('.input_pass').val());
    let email = $('.input_user').val();
    if (email != "") {
        $.post("/login/authenticateUser", { email, password }, function (response) {
            if (response.code == 1) {
                localStorage.jwtToken = response.token;
                window.location.replace("http://192.168.0.104:3000/admin");
            }
            else {
                $('#error').text('*' + response.message);
            }
        });
    }
    else {
        $('#error').text('*'+'username not specified');
    }
})