//  here we are going to be 
//  doing the real deal of gettting of the real infomation 
 const express = require('express');



const Scrapping_Info_Router=express();
  Scrapping_Info_Router.use("/" , express.static("public"));
  // here is for the db  
  const place_db  = require("../MODEL/place.js");
  
   Scrapping_Info_Router.use("/this_place",express.static("public"))
   Scrapping_Info_Router.get("/this_place/:place_name",async(req,res)=>{
//  for the page for a single place  
 let one_there  = await place_db.findOne(
   {place_name : req.params.place_name}
   )

  if(one_there){
      res.render("./Page/single_company.ejs",
     {res_bee :one_there}
     )
  }else{
     res.status(400).send("stop_try to _fake name ",
     )
  }
       })

   module.exports = Scrapping_Info_Router;