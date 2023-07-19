// here is the dealing of the place and the other
//   thing that relate like the 
//  --- info online 
//  -- opportunity
 const express = require('express');
 const Place_mega_Router = express.Router();

  
 Place_mega_Router.use("/",express.static("public"));
  
  
//  for the db
const place = require('../MODEL/place');
  
 
//  one
  Place_mega_Router.get("/all",async(req,res)=>{
    //   here for the viewing of all of them 
     let all_here_now = await place.find();
      res.render("./Page/All_now.ejs",{all_here_now:all_here_now})
  })
  
   

//   Route for adding it to the place where we do need it
Place_mega_Router.post("/one_here",async(req,res)=>{
    //  the content
     let {place_name,level_relevance} =req.body;
    //  cheking if it is there already 
      let isthere = await place.findOne({place_name:place_name})

       if(isthere){
         res.send("Man this place is in the db ")
       }else{
         
         let new_place = new place({
               place_name  : place_name,
                level_relevance  : level_relevance
         })
        //    then we save it
          try{
            await new_place.save();
              res.json({result : "done in the back"});
          }catch{
            res.json({result : "Not Good"});
        }
         
       }
})

// DELETING OF PLACE
 Place_mega_Router.get("/delete/:place_id",async(req,res)=>{
  
  //  checking if there
    let place_now  = await place.findOne({_id : req.params.place_id })
   if(place_now){
   await place.deleteOne({_id : place_now._id}).then(
      res.redirect("/Place/all")
   ).catch((err)=>{
res.send("there_was bad err")
   })
    
   }else{
     res.send("there is no place_like that")
   }
   
 })


module.exports = Place_mega_Router;