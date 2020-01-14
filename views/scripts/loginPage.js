
$('.login_btn').click(function () {
    let password = $('.input_pass').val();
    console.log(Sha256.hash(password))
})