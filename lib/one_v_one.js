module.exports ={
  newRating: function(or, c, es, as){
    return or + c * (as - es);
  },
  expectedScore: function(pRating, oRating){
    return ((pRating) + (oRating))/4000
  },
  checkConstant: function(constant, rating, gemesPlayed){
    if(rating < 130 && gamesPlayed < 10 && constant !== 20){
      return 50
    } else if(rating < 170 && gamesPlayed < 20 && constant !== 10){
      return 30
    } else if(rating < 190 && gamesPlayed < 30 && constant !== 10){
      return 20
    } else {
      return 10
    }
  }
}
