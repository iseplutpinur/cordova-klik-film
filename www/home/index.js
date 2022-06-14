$(document).ready(() => {
    // set profile
    const user = repo.getUser();
    $('.user-profile>img').attr('src', '../assets/img/logo.png');
    // $('.user-profile>img').attr('src', user.foto);
    $('.user-info>h6').text("Klik Film");
})

function logout() {
    repo.resetUser();
    window.location.href = '/';
}
function cekLogin() {
    if (repo.getUser() == null) logout();
}
// cekLogin();