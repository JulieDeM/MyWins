module.exports ={
  newRating: function(or, c, es, as){
    return or + c * (as - es);
  },
  expectedScore: function(pRating, oRating){
    return ((pRating) + (oRating))/400
  },
  checkConstant: function(constant, rating, gamesPlayed){
    if(rating < 130 && gamesPlayed < 10 && constant !== 30){
      return 40
    } else if(rating < 170 && gamesPlayed < 20 && constant !== 20){
      return 30
    } else if(rating < 190 && gamesPlayed < 30 && constant !== 10){
      return 20
    } else {
      return 10
    }
  }
}
