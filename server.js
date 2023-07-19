const express = require('express');
 const expressejs = require("express-ejs-layouts");
  const body_parser = require("body-parser");
    const mongoose = require("mongoose");
   const app = express();



     app.use(body_parser.json());
      app.use(express.json());
        
//  setting up the view engine and other
 app.set("view engine","ejs");
  app.set("views",__dirname+"/views");
   app.set("layout","layouts/layout.ejs");
     app.use(expressejs); 
      app.use(express.static("public"));

    //    here we are setting up the db 
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://127.0.0.1:27017/GhostWinter");
       const donedb = mongoose.connection;
     donedb.on("open",()=>{
        //   when it is connected
         console.log("the db is connected and ready");
     })
       donedb.on("error",()=>{
         console.log("the db could not connect");
       })
     
    

        //  routers from the other world
const Place_mega_Router = require('./Routers/Places_');
 app.use("/Place",Place_mega_Router);
  //  this is the router for the scrpping

 const axios = require("axios");
const Scrapping_Info_Router = require('./Routers/Scrapping_info');
const { ghost_google_search } = require('./utils/scrapping_function');
 app.use('/scrap',Scrapping_Info_Router);
 


  // here is the function which is going to be scraping goolge for 
  //  the name of the comapany that are in the db there
 
 


  
//   this is the router for the home page
 app.get("/",async(req,res)=>{
  res.render("landing_page.ejs"); 
  await ghost_google_search();
 })
 app.listen(3001,()=>{
     console.log("someone is here")
 })