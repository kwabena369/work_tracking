

const axios = require("axios")
const unirest = require("unirest")
const cherrio = require("cheerio");
 
//   for the db 
 const place_there = require("../MODEL/place")
 function bring_user_agent(){
   let user_agent_array =
   ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36", 
   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    ]
     
   
    // here is for the actaul picking of the thing
     let rand_number = Math.floor(Math.random()*user_agent_array.length);
      
      return user_agent_array[rand_number];
     
 }

 
  // go there into goolge and theb scrap thing there
   
    async function ghost_google_search(){
      //   for all _there in the system 
       const all_there =  
       await place_there.find();
        // then taking one by one of tem and doing the thing
    all_there.forEach(async(element) =>{
      //   then taking the man of the thing and doing the thing

      await unirest.get(`https://www.google.com/search?q=${element.place_name}&gl=us&hl=en`)
      .headers({'User-Agent':`${ bring_user_agent()}`})
      .then(
          (res)=>{
            try{
  const  $=  cherrio.load(res.body);
    $("div div #center_col div").find(".BYM4Nd").each(async(i,el)=>{
        // here am going to be taking the 
        //  thing of href 
        let thier_link = $(el).find("a").attr("href");
     let some_boring_real_thing  = $(el).text()
console.log(thier_link)
     element.goolgle_result = `<div>
       <span><a href='${thier_link}' class="bg-yellow-400 p-3 rounded-lg w-fit 
       font-sans text-2xl">Link</a> </span>
      <span> ${some_boring_real_thing} </span>
       </div>`
        element.save();
       })
        console.log("sraping done in the back")
            }catch(err){
               let $ = "beans"
      console.log("could not do the scrapping")
       console.log(err)
       return $
            }
     }
      )
       
    })

    }
module.exports = {
  bring_user_agent :bring_user_agent,
  ghost_google_search : ghost_google_search

};
