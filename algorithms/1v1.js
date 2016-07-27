// USER STORY
// when user enters a game record, they input opponent and final score,
// then both user and opponent get updated rating and game is recorded
// in their histories

// App steps:
// 1. Get Input
//    a. User's Data
//    b. Opponent's Data
//    c. Final score
// 2. Compute and Deliver Output
//    a. User's New Rating
//    b. Opponent's New Rating
//    c. Game record
//

// This data is calculated when user posts final score and opponent
// Lines 19 - 42 is just example data - this will be different for every game
var gameRecord = {
  id: 598,
  player_id: 31,
  opponent_id: 87, // retrieved from user selecting opponent
  playerScoreNum: 10, // input by user
  opponentScoreNum: 8, // input by user
  playerScore: 1, // calculated in post request (winner receives 1 point)
  opponentScore: 0 // calculated in post request (loser receives 0 points)
};

// After receiving above data, we can access below data from database
var player = {
  id: 31,
  gamesPlayed: 8,
  currentRating: 800,
  constant: 30
};

var opponent = {
  id: 87,
  gamesPlayed: 6,
  currentRating: 1100,
  constant: 30
};


// All code below (except for updated records) is STATELESS.

// After receiving the above three data points (objects), we can calculate
// the new ratings.
var newRating = function(or, c, es, as){
  return or + c * (as - es);
};

// If we wanted to post the odds of winning the game before score is recorded,
// we'd use the data and functions below
var expectedScore = function(pRating, oRating){
  return ((pRating) + (oRating))/4000
};

var playerES = expectedScore(player.currentRating, opponent.currentRating);
var opponentES = 1 - playerES;

var pActualScore = gameRecord.playerScore;
var oActualScore = gameRecord.opponentScore;

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

var pNewRating = newRating(player.currentRating, player.constant, playerES, pActualScore);
var oNewRating = newRating(opponent.currentRating, opponent.constant, opponentES, oActualScore);

// on backend, update table where id = player or opponent id
var updatedPlayer = {
  gamesPlayed: player.gamesPlayed + 1,
  currentRating: pNewRating,
  constant: checkConstant(player.constant, pNewRating, (player.gamesPlayed + 1))
};

var updatedOpponent = {
  gamesPlayed: opponent.gamesPlayed + 1,
  currentRating: oNewRating,
  constant: checkConstant(opponent.constant, oNewRating, (opponent.gamesPlayed + 1))
};

console.log(updatedPlayer);
console.log(updatedOpponent);

// What if it's the user's first game ever?
// Maybe we should 
