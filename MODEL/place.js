const  mongoose  = require("mongoose");

//  the schema to deal with 
 const place_schema = new mongoose.Schema({
     place_name : {
         type : String,
          required : true 
     },
      level_relevance : {
          type : String,
          required : true
      },
    //    here it is going to be stroing some of the 
    // info that was found online ther
     goolgle_result : {
         type :String,
          default : "Beans"
     },
      news:{
        type :String,
         default : "News is Beans"
      }
 })
//  makeng in available
  module.exports = mongoose.model("place_",place_schema);

 