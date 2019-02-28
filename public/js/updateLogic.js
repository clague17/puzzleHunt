
var answers = { 1 : ['herzstein', 'herzstein amph', 'herzstein amphiteater', 'herzstein'],
                2 : 'spencer',
                3 : 'ihatecomp',
                4 : 'nlogn',
                5 : 'sheik',
                6 : 'luaylove',
                7 : 'zoran'};


var database = firebase.database();

invokeVerifyAnswer = (event) => {
    console.log("DID THIS HAPPEN");
    let arg1 = event.target.getAttribute('data-arg1');
    alert('DID THIS HAPPEN');
    verifyAnswer(arg1);
    //hope function is in window.
    //Else the respective object need to be used
};

function verify1() {
        verifyAnswer(1);
}
function verify2() {
        verifyAnswer(2);
}
function verify3() {
        verifyAnswer(3);
}
function verify4() {
        verifyAnswer(4);
}
function verify5() {
        verifyAnswer(5);
}
function verify6() {
        verifyAnswer(6);
}
function verify7() {
        verifyAnswer(7);
}


function verifyAnswer(questionNum) {
        var teamName = document.getElementById('teamName' + questionNum).value;
        // var questionNum = document.getElementById('submittedQuestion').value;
        console.log(questionNum);
        var inputString = document.getElementById('answerTry' + questionNum).value;
        console.log(inputString.toUpperCase());
        var copyArray = answers[1];
        if (questionNum === 1) {
                //handle array differently
                answers[1].forEach((str) => {
                        if (inputString.toString().toUpperCase() === str.toUpperCase()){
                                alert("YOU GOT ONEEEEEEEE :D");
                                //write to the database;
                                database.ref('teams').once('value').then((data) => updateScoreAnswer(data, teamName, questionNum));
                                // location.reload();
                                return;
                                // updateScoreAnswer(teamName);
                        } else {
                                copyArray.shift();
                        }
                });
                if (copyArray.length == 0) {
                        console.log("this one");
                        alert("Not quite.... keep trying!");
                }
        }
        else if (inputString.toString().toUpperCase() === answers[questionNum].toUpperCase()) {
                alert("YOU GOT ONEEEEEEEE :D");
                //write to the database;
                database.ref('teams').once('value').then((data) => updateScoreAnswer(data, teamName, questionNum));
                // location.reload();
                // updateScoreAnswer(teamName);
        } else {
                console.log(inputString.toUpperCase());
                console.log(answers[questionNum].toUpperCase());
                alert("Not quite.... keep trying!");
        }
}

// var ref1 = database.ref('teams');
// var readData = ref1.once('value').then(updateScoreAnswer(teamName);

function updateScoreAnswer(data, correctAnswerTeam, questionNum) {
        var teams = data.val();
        var keys = Object.keys(teams);
        for(var i=0; i<keys.length; i++){
            var k = keys[i];
            var teamName = teams[k].teamName;
            var userList = teams[k].users;
            var puzzles = teams[k].puzzles;
            var puzzlesSolved = teams[k].puzzlesSolved;
            console.log(teamName.toString());
            console.log(correctAnswerTeam);
            if (correctAnswerTeam.toUpperCase() == teamName.toUpperCase()) {
                    if (!(questionNum in puzzles)) {
                            puzzles[questionNum] = true;
                            puzzlesSolved++;
                            firebase.database().ref('teams/' + k.toString()).set({
                                teamName: teamName,
                                users: userList,
                                puzzlesSolved : puzzlesSolved,
                                puzzles : puzzles
                              });
                      } else {
                              alert("You've already answered this one!");
                      }
                    //make a new one with updated updated score

                    // var updateScore = {
                    //     teamName: teamName.value,
                    //
                    //     users: userList,
                    //     puzzlesSolved: puzzlesSolved++,
                    // }
                    // console.log(updateScore);
                    // ref.push(updateScore);
            } else if (i == keys.length - 1) {
                    alert('Make sure you type your team name exactly as you registered it!');
            }
        }
}
