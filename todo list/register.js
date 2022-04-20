function signup() {
    var name = $('#name').val();
    var mail = $('#mail').val();
    var pwd = $('#pwd').val();
    if (localStorage['signup'] == undefined) {
        let det = {
            "det": [],

        }
        localStorage['signup'] = JSON.stringify(det);
    }
    let store = JSON.parse(localStorage['signup']);
    if (store.det.length > 0) {
        let finddet = store.det.find(value => value.mail == mail && value.pwd == pwd);
        if (finddet) {
            alert("ALREADY REGISTERED");
            return false;
        }
    }
    let newdet = {
        "name": name,
        "mail": mail,
        "pwd": pwd,
        "todolist": []
    }
    store.det.push(newdet);
    localStorage['signup'] = JSON.stringify(store);
}