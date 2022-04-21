let removeid = [];
let li;
let inputvalue = '';
var signin = '';
var signup = '';
let user = '';
let userdetails = '';
/**
 * This will execute when we reload the page
 */
window.onload = function() {
    if (sessionStorage.getItem('login') != undefined) {

        signin = JSON.parse(sessionStorage.getItem('login'));
        signup = JSON.parse(localStorage['signup']);
        user = signup.det.find(details => details.mail == signin.mail && details.pwd == signin.pwd);
        console.log('localstore', signup);
        console.log('finduser', user);
        userdetails = user;
        displayfirst();
    }
}

/**
 * This function will add the task and call show() method
 */
function add() {

    inputvalue = document.getElementById('task').value.trim();
    if (inputvalue.length != 0) {
        let addtask = {
            'task': inputvalue,
            'completed': 'no'
        }
        userdetails.todolist.push(addtask);
        console.log("addtask", addtask);
        console.log("local ", JSON.parse(localStorage.getItem('signup')));
        console.log(userdetails);

        document.getElementById('task').value = '';
        show();

    } else {
        alert("write a task to be done");
    }

}

/**
 * This method generates random id for list tag
 * @param {*} length --> It specifies the length of the id
 * @returns --> It returns the list tag id
 */
function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomId = '';
    for (var i = 0; i < length; i++) {
        randomId += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return randomId;
}

/**
 * This function will display all the task which is given by user
 * It calls random id generator method 
 * It contains EventListener
 * It calls save() method to save the modification
 */
function show() {

    li = document.createElement('li');
    li.innerText = inputvalue;
    document.getElementById('mylist').appendChild(li);
    li.id = getRandomString(6);
    click();
    save();
}


/**
 * This method is used to save all the modifications in localStorage
 */
function save() {

    for (let signupdetails of signup.det) {
        if (signupdetails.mail == signin.mail && signupdetails.pwd == signin.pwd) {
            signupdetails.todolist = userdetails.todolist;
        }
    }
    console.log(signup);
    localStorage['signup'] = JSON.stringify(signup);

}

/**
 * This method is used to clear all the tasks 
 */
function clearall() {
    var parent = document.getElementById('mylist');
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    userdetails.todolist = [];
    save();

}


/**
 * This method is used to clear the completed task
 */
function clear_complete() {
    for(let removeId of removeid){
        console.log("array",removeId);
        if (document.getElementById(removeId)) {
            var getid = document.getElementById('mylist').removeChild(document.getElementById(removeId));
            console.log(removeId);
            var getvalue = getid.innerText;
            console.log("getid ", getid);
            console.log("getvalue ", getvalue);

        }
    }

    var filteringtodolist = userdetails.todolist.filter(completetask => completetask.completed == 'no');
    userdetails.todolist = filteringtodolist;
    save();

}

/**
 * This method is used to logout from the todolist page
 */
function logout() {
    sessionStorage.clear();
    location.assign("todo_login.html");
}

/**
 * This method is used to retrieve the tasks which is store by the user when the user logged 
 * in that page
 */
function displayfirst() {
    console.log("todolist ", userdetails.todolist);
    for (var i in userdetails.todolist) {
        li = document.createElement('li');
        li.innerText = userdetails.todolist[i].task;
        document.getElementById('mylist').appendChild(li);
        li.id = getRandomString(6);
        console.log("li.id", li.id);
        if (userdetails.todolist[i].completed == 'yes') {
            document.getElementById(li.id).style.textDecoration = "line-through";
            document.getElementById(li.id).style.background = "#ABB2B9";
            removeid.push(li.id);
        }
        click();

    }
    save();
}

function click(){
    /**
     * When the user single clicks on task then it displays that it will be completed
     * by changing background color and text decoration ( line - through )
     */
    li.addEventListener('click', function($event) {

        document.getElementById($event.target.id).style.textDecoration = "line-through";
        document.getElementById($event.target.id).style.background = "#ABB2B9";
        removeid.push($event.target.id);
        console.log("onclick text ", document.getElementById($event.target.id).innerText);
        var find = document.getElementById($event.target.id).innerText;
        console.log("find ", find);
        console.log("onclick id ", $event.target.id);

        for(let todolist of userdetails.todolist){
            if (todolist.task == find && todolist.completed == "no") {
                todolist.completed = "yes";
                save();
                break;
            }
        }
    });

    /**
     * when user double clicks the task then it delete from the tasks
     */
    li.addEventListener('dblclick', function($event) {
        var getid = document.getElementById($event.target.id);
        var getval = getid.innerText;
        console.log("remove value ", getval);
        for (var i = 0; i < userdetails.todolist.length; i++) {
            if (userdetails.todolist[i].task == getval) {
                console.log(userdetails.todolist[i].task);
                userdetails.todolist.splice(i, 1);
                save();
                break;
            }
        }
        document.getElementById($event.target.id).remove();
    });

}
