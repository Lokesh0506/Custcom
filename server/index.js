const express= require("express");
const  mysql= require("mysql");
const app=express();
const cors = require("cors");

app.use(cors());



app.listen(8080,(err)=>{
    if(err){
        console.log("Port not connected"+err);
    }
    else{
        console.log("Server is running on port 8080");
    }
});



app.get('/home', (req, res) => {
    const db = mysql.createConnection({
      user: "root",
      password: "root",
      host: "localhost",
      database: "home_page"
    });
  
    const response = {};
  
    db.query('SELECT * FROM header', (err, headerResult) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      response.header = headerResult;
  
      db.query('SELECT * FROM body', (err, bodyResult) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        
        response.body = bodyResult;
        res.send(response);
      });
    });
  });
  
