var Algo = require('../lib/algorithm');

module.exports = {
  runMath: function(user1, user2, user1_score, user2_score){
    var u1ExScore = Algo.expectedScore(user1.rating, user2.rating);
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
    var u1newRating = Algo.newRating(user1.rating, user1.constant, u1ExScore, u1AcScore);
    var u2newRating = Algo.newRating(user2.rating, user2.constant, u2ExScore, u2AcScore);
    var updateU1 = {
      gamesPlayed: user1.gamesPlayed + 1,
      rating: u1newRating,
      constant: Algo.checkConstant(user1.constant, u1newRating, (user1.gamesPlayed + 1))
    };
    var updateU2 = {
      gamesPlayed: user2.gamesPlayed + 1,
      rating: u2newRating,
      constant: Algo.checkConstant(user2.constant, u2newRating, (user2.gamesPlayed + 1))
    };
    return [updateU1, updateU2]
  }

}
