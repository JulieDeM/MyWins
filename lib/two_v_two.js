var Algo = require('../lib/alorithm');

module.exports = {
  runMath: function(user1, user2, user1_score, user2_score){
    var u1ExScore = Algo.expectedScore(user1.teamRating, user2.teamRating);
    var u2ExScore = 1 - u1ExScore;
    if (Number(user1_score) > Number(user2_score)){
      var u1AcScore = 1;
      var u2AcScore = 0;
    } else if (Number(user1_score) < Number(user2_score)){
      var u1AcScore = 0;
      var u2AcScore = 1;
    } else {
      var u1AcScore = 0.5;
      var u2AcScore = 0.5;
    }
    var u1newRating = Algo.newRating(user1.teamRating, user1.teamConstant, u1ExScore, u1AcScore);
    var u2newRating = Algo.newRating(user2.teamRating, user2.teamConstant, u2ExScore, u2AcScore);
    var updateU1 = {
      gamesPlayed: user1.gamesPlayed + 1,
      teamRating: u1newRating,
      teamConstant: Algo.checkConstant(user1.teamConstant, u1newRating, (user1.gamesPlayed + 1))
    };
    var updateU2 = {
      gamesPlayed: user2.gamesPlayed + 1,
      teamRating: u2newRating,
      teamConstant: Algo.checkConstant(user2.teamConstant, u2newRating, (user2.gamesPlayed + 1))
    };
    return [updateU1, updateU2]
  }

}
