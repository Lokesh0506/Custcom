const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, (err) => {
  if (err) {
    console.log("Port not connected" + err);
  } else {
    console.log("Server is running on port 8080");
  }
});

app.post("/login", (req, res) => {
  const db = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "admin",
  });

  db.query(
    "SELECT * FROM usepass WHERE username=? AND mobilenum=?",
    [req.body.username, req.body.mobilenumber],
    (err, dbres) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }

      if (req.body.username === "" || dbres.length === 0) {
        return res.send("invalidUsername");
      }

      if (req.body.username === "admin") {
        if (dbres[0].password === req.body.password) {
          return res.send("toAdmin");
        } else {
          return res.send("incorrectPassword");
        }
      } else {
        if (req.body.password === dbres[0].password) {
          return res.send("toUser");
        } else {
          return res.send("incorrectPassword");
        }
      }
    }
  );
});

app.get("/home", (req, res) => {
  const db = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "homepage",
  });

  const invdb = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "inventory",
  });

  const response = {};

  db.query("SELECT * FROM header", (err, headerResult) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    response.header = headerResult;

    db.query("SELECT * FROM body", (err, bodyResult) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }

      response.body = bodyResult;

      invdb.query(
        "SELECT * FROM books ORDER BY RAND() LIMIT 5;",
        (err, invbook) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
          }
          response.inv = {};
          response.inv.book = invbook;

          invdb.query(
            "SELECT * FROM electronic ORDER BY RAND() LIMIT 5;",
            (err, invelec) => {
              if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
              }

              response.inv.electronic = invelec;

              invdb.query(
                "SELECT * FROM grocery ORDER BY RAND() LIMIT 5;",
                (err, invgroc) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).send("Internal Server Error");
                  }

                  response.inv.grocery = invgroc;

                  db.query("SELECT * FROM footer", (err, footerResult) => {
                    if (err) {
                      console.log(err);
                      return res.status(500).send("Internal Server Error");
                    }

                    response.footer = footerResult;
                    return res.send(response);
                  });
                }
              );
            }
          );
        }
      );
    });
  });
});

app.get("/cart", (req, res) => {
  const inventoryDb = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "inventory",
  });

  const cartDb = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "8789873838",
  });

  const cartstyle = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "cartbody",
  });

  const response = {};

  cartstyle.query("SELECT * FROM body", (err, cartStyle) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    cartDb.query("SELECT * FROM cart", (err, cartResult) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }

      const cartItems = cartResult.map((item) => ({
        pid: item.pid,
        category: item.category,
      }));

      const categoryPromises = cartItems.map((cartItem) => {
        return new Promise((resolve, reject) => {
          inventoryDb.query(
            "SELECT * FROM ?? WHERE pid = ?",
            [cartItem.category, cartItem.pid],
            (err, categoryResult) => {
              if (err) {
                reject(err);
              } else {
                resolve(categoryResult);
              }
            }
          );
        });
      });

      Promise.all(categoryPromises)
        .then((results) => {
          response.cart = cartResult;
          response.inventory = results;
          response.cartStyle = cartStyle;
          return res.send(response);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        });
    });
  });
});

app.post("/cart/add", (req, res) => {
  const cartDb = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "8789873838",
  });

  console.log("Received request to update quantity:");
  console.log("PID:", req.body.pid);
  console.log("Quantity:", req.body.quantity);

  cartDb.query(
    "UPDATE cart SET quantity = ? WHERE pid = ?",
    [req.body.quantity, req.body.pid],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      } else {
        res.send("Successfully added");
      }

      console.log("Quantity updated successfully");
    }
  );
});

app.post("/category", (req, res) => {
  
  const db = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "homepage"
  });

  const invdb = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "inventory"
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

     

      invdb.query(`SELECT * FROM ${req.body.category}`, (err, invResult) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }
  
        response.inv = invResult;
      

      
            db.query('SELECT * FROM footer', (err, footerResult) => {
              if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
                return;
              }
              response.footer = footerResult;
          
              response.category={category:req.body.category};


            res.send(response);

            
            });
          })
        });
      });
}

);
app.post("/cart/frstadd", (req, res) => {
  const cartadd = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "8789873838",
  });

  const { prdId, price, category } = req.body;

  const sql = 'INSERT INTO cart (pid, price, category) VALUES (?, ?, ?)';
  const values = [prdId, price, category];

  cartadd.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    } else {
      res.send("Successfully added");
    }
  });
});


app.post("/custcom", (req, res) => {
  const struct = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "homepage",
  });

 

  
  const response=[];

  struct.query('SELECT * FROM header',(err,headerResult)=>{
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    response.push(...headerResult);

    struct.query('SELECT * FROM body',(err,bodyResult)=>{
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      response.push(...bodyResult);

      struct.query('SELECT * FROM footer',(err,footerResult)=>{
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        response.push(...footerResult);

        res.send(response);

    });
  });
  });
});
