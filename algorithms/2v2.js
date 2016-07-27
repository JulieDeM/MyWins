// USER STORY
// when user enters a team game record, they input team mate, opponents and final score,
// then both user, team mate and opponents get updated rating and game is recorded
// in their histories


// This data is calculated when user posts final score and opponent
// Lines 19 - 42 is just example data - this will be different for every game
var teamGameRecord = {
  id: 1598,
  team_id: 131,
  opponent_team_id: 187, // retrieved from user selecting opponent
  teamScoreNum: 10, // input by user
  opponentTeamScoreNum: 8, // input by user
  teamScore: 1, // calculated in post request (winner receives 1 point)
  opponentTeamScore: 0 // calculated in post request (loser receives 0 points)
};

// After receiving above data, we can access below data from database
var team = {
  id: 131,
  gamesPlayed: 3,
  currentRating: 800,
  constant: 30,
  player1_id: 31,
  player2_id: 91
};

var opponentTeam = {
  id: 187,
  gamesPlayed: 6,
  currentRating: 1100,
  constant: 30,
  player1_id: 46,
  player2_id: 22
};


// All code below (except for updated records) is STATELESS.

// After receiving the above three data points (objects), we can calculate
// the new team ratings (individual user ratings are not affected).
var newRating = function(or, c, es, as){
  return or + c * (as - es);
};

// If we wanted to post the odds of winning the game before score is recorded,
// we'd use the data and functions below
var expectedScore = function(tRating, oRating){
  return ((tRating) + (oRating))/4000
};

var teamES = expectedScore(team.currentRating, opponentTeam.currentRating);
var opponentTeamES = 1 - teamES;

var tActualScore = teamGameRecord.teamScore;
var oActualScore = teamGameRecord.opponentTeamScore;

// Permanently decrease constant to 20 if rating > 2300 OR if gamesPlayed > 30, etc
var checkConstant = function(constant, rating, gamesPlayed){
  if(rating < 2000 && gamesPlayed < 30 && constant !== 20){
    return 30
  } else if(rating < 2300 && gamesPlayed < 60 && constant !== 10){
    return 20
  } else {
    return 10
  }
};

var tNewRating = newRating(team.currentRating, team.constant, teamES, tActualScore);
var oNewRating = newRating(opponentTeam.currentRating, opponentTeam.constant, opponentTeamES, oActualScore);

// on backend, update table where id = player or opponent id
var updatedTeam = {
  gamesPlayed: team.gamesPlayed + 1,
  currentRating: tNewRating,
  constant: checkConstant(team.constant, tNewRating, (team.gamesPlayed + 1))
};

var updatedOpponentTeam = {
  gamesPlayed: opponentTeam.gamesPlayed + 1,
  currentRating: oNewRating,
  constant: checkConstant(opponentTeam.constant, oNewRating, (opponentTeam.gamesPlayed + 1))
};

console.log(updatedTeam);
console.log(updatedOpponentTeam);
