module.exports ={

validateUsername : function(fld){
    var error = "";
    var illegalChars = /\W/; // allow letters, numbers, and underscores

    if (fld.name == "") {
        var error = "blank";
        console.log(error);
        return error

    } else if (illegalChars.test(fld.name)) {
        var error = "illegal";
		    console.log(error);
		    return error

    } else if (!fld.sport) {
        var error = "nosport";
		    console.log(error);
		    return error

    } else {
      console.log("no error");
      return "no error"
    }
}
}
