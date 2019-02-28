
var answers = { 1 : ['herzstein', 'herzstein amph', 'herzstein amphiteater', 'herzstein'],
                2 : 'spencer',
                3 : 'ihatecomp',
                4 : 'nlogn',
                5 : 'sheik',
                6 : 'luaylove',
                7 : 'zoran'};


var database = firebase.database();


function verifyAnswer() {
        var teamName = document.getElementById('teamName').value;
        var questionNum = document.getElementById('submittedQuestion').value;
        var inputString = document.getElementById('answerTry').value;
        console.log(inputString.toUpperCase());
        var copyArray = answers[1];
        if (questionNum === 1) {
                //handle array differently
                for (var str : answers[1]) {
                        if (inputString.toString().toUpperCase() === str.toUpperCase()){
                                alert("YOU GOT ONEEEEEEEE :D");
                                //write to the database;
                                database.ref('teams').once('value').then((data) => updateScoreAnswer(data, teamName, questionNum));
                                location.reload();
                                return;
                                // updateScoreAnswer(teamName);
                        } else {
                                copyArray.shift();
                        }
                }
                if (copyArray.length == 0) {
                        alert("Not quite.... keep trying!");
                }
        }
        else if (inputString.toString().toUpperCase() === answers[questionNum].toUpperCase()) {
                alert("YOU GOT ONEEEEEEEE :D");
                //write to the database;
                database.ref('teams').once('value').then((data) => updateScoreAnswer(data, teamName, questionNum));
                location.reload();
                // updateScoreAnswer(teamName);
        } else {
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
            console.log(k.toString());
            if (correctAnswerTeam === teams[k].teamName) {
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
