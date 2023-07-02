const express= require("express");
const  mysql= require("mysql");
const app=express();
const cors = require("cors");

app.use(cors());
app.use(express.json());



app.listen(8080,(err)=>{
    if(err){
        console.log("Port not connected"+err);
    }
    else{
        console.log("Server is running on port 8080");
    }
});


app.post('/login', (req, res) => {
  console.log("entered login server");
  const usepass = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "admin"
  });

  console.log(usepass);
if(req.body.username ==="admin"){
  usepass.query(`SELECT * FROM usepass WHERE username = '${req.body.username}'`, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send('Incorrect_username');
      return;
    }
    if(response[0].password===req.body.password){
      res.send("toadmin");
      return;
    }
    else{
      res.send("incorrect_pass");
      return;
    }

});}
else{
  console.log("entered usecheck");
  usepass.query(`SELECT * FROM usepass WHERE mobilenum ='${req.body.mobilenumber}' `, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send('Incorrect_username');
      return;
    }
    if(response[0].password===req.body.password){
      res.send("touser");
      return;
    }
    else{
      res.send("incorrect_pass");
      return;
    }

  });
  
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
  
