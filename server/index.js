const express= require("express");
const  mysql= require("mysql");
const app=express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(8080,(err)=>{
    if(err){
        console.log("Port not connected"+err);
    }
    else{
        console.log("Server is running on port 8080");
    }
});

app.post('/login', (req, res) => {
  const db = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "admin"
  });

  const response = {};

  db.query('SELECT * FROM usepass WHERE username=? AND mobilenum=?',[req.body.username,req.body.mobilenumber], (err, dbres) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if(req.body.username===""|dbres.length === 0){
      res.send("invalidUsername");
      return;
    }
    if(req.body.username==="admin"){
      if(dbres[0].password===req.body.password){
        res.send("toAdmin");
        return;
      }else{
        res.send("incorrectPassword");
        return ;
      }
    }

    else if(req.body.password===dbres[0].password){
      res.send("toUser");
      return;
    }
    else{
        res.send("incorrectPassword");
        return ;
      }

  });
});



app.get('/home', (req, res) => {
    const db = mysql.createConnection({
      user: "root",
      password: "root",
      host: "localhost",
      database: "homepage"
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
  
