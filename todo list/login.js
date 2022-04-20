sessionStorage.clear();

function signin() {

    if (localStorage['signup'] != undefined) {
        var mail = $('#mail').val();
        var pwd = $('#pwd').val();
        console.log(pwd);

        let user = JSON.parse(localStorage['signup']);
        let finddet = user.det.find(value => value.mail == mail && value.pwd == pwd);

        if (finddet) {
            let login = {
                "mail": mail,
                "pwd": pwd
            }
            sessionStorage.setItem('login', JSON.stringify(login));
            return true;
        } else {
            alert("INVALID EMAIL OR PASSWORD");
            return false;
        }
    } else {
        return false;
    }
}