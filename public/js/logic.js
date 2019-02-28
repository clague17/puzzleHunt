var createTeam = function() {
        isLoggedIn() //check if logged in

        //then check if this person already has a team within the database, can only be done once.
        //then proceed to a different page where this person specifies the names of the team members that will make up the team
        //stress that this cannot be changed later.
}

// var answers = {1: }


var team;
var rank;
var teamName;
var puzzlesSolved;

var displayCounter = 0;

    //getting elements for auth
//Sign in User
var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope(name);

// firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

// This is called with the results from from FB.getLoginStatus().
var isLoggedIn = false;

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    isLoggedIn = true;
    // testAPI();
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log("Your mom");
    console.log(response.status);
    if (response.status === 'connected') {
            isLoggedIn = true;
    } else if (response.status === 'not_authorized') {
        //login function
        alert('login first');
    } else {
        //login function
        alert('login first');
    }
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '987997444728003',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v3.2' // The Graph API version to use for the call
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

    function firebaseLogin(){
        const email = document.getElementById('txtEmail').value;
        const pass = document.getElementById('txtPassword').value;
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(email, pass);
        console.log(email, pass);
        if(email)
        window.open('administrator.html');
        }
//Log out
    function firebaseLogout(){
        console.log('bye!');
        firebase.auth().signOut();
    }

    firebase.auth().onAuthStateChanged(firebaseUser => { //keeps checking if admin signed out
        if(firebaseUser) {
            console.log(firebaseUser);
        } else{
            console.log('not logged in');
        }
        })

    var database = firebase.database();

    function newTeam(){


        var newTeam = {
            teamName: document.getElementById('teamName').value,
            users: [document.getElementById('user1').value,
                        document.getElementById('user2').value,
                        document.getElementById('user3').value,
                        document.getElementById('user4').value],
            puzzlesSolved: 0,
        }
        console.log(newTeam)
        ref.push(newTeam);

    }

    var sortedTeams;

    var ref = database.ref('teams');
    ref.on('value', gotData, errData);

    function gotData(data){
        console.log(data.val());
        var teams = data.val();
        var keys = Object.keys(teams);

        console.log(keys);
        for(var i=displayCounter; i<keys.length; i++){
            displayCounter++;
            var k = keys[i];
            var teamName = teams[k].teamName;
            var userList = teams[k].users;
            var puzzlesSolved = teams[k].puzzlesSolved;
            var table = document.getElementById('teamList');
            var members = document.getElementById('usuarios');
            var teamNames = document.getElementById('teamName');
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            teamNames.innerHTML = teamName;
            // members.innerHTML = users;
            cell1.innerHTML = teamName;
            cell2.innerHTML = userList;
            cell3.innerHTML = puzzlesSolved;
        }
    }

    function errData(err){
        console.log('Error!');
        alert('YOU DID SOMETHING WRONG LMAO');
        console.log(err);
    }

    function verifyAnswer(inputString) {

    }
