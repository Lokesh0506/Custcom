const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const multer = require('multer');
const path = require('path');

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
        db.end();
        return res.status(500).send("Internal Server Error");
      }

      if (req.body.username === "" || dbres.length === 0) {
        db.end();
        return res.send("invalidUsername");
      }

      if (req.body.username === "admin") {
        if (dbres[0].password === req.body.password) {
          db.end();
          return res.send("toAdmin");
        } else {
          db.end();
          return res.send("incorrectPassword");
        }
      } else {

        if (req.body.password === dbres[0].password) {
          db.end();
          return res.send("toUser");
        } else {
          db.end();
          return res.send("incorrectPassword");
        }
      }
    }
  );
});

app.get("/div_fetch",(req,res)=>{
  const db = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "homepage",
  });

  db.query("SELECT * FROM div_table", (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    db.end();
   res.send(response);
  });
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
      db.end();
      return res.status(500).send("Internal Server Error");
    }
    response.header = headerResult;

    db.query("SELECT * FROM body", (err, bodyResult) => {
      if (err) {
        console.log(err);
        db.end();
        return res.status(500).send("Internal Server Error");
      }

      response.body = bodyResult;

      invdb.query(
        "SELECT * FROM books ORDER BY RAND() LIMIT 5;",
        (err, invbook) => {
          if (err) {
            console.log(err);
            invdb.end();
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
                    invdb.end();
                    db.end();
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
      cartStyle.end();
      return res.status(500).send("Internal Server Error");
    }

    cartDb.query("SELECT * FROM cart", (err, cartResult) => {
      if (err) {
        console.log(err);
        cartDb.end();
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
          cartDb.end();
          cartstyle.end();
          inventoryDb.end();
          return res.send(response);
        })
        .catch((err) => {
          console.log(err);
          cartDb.end();
          cartstyle.end();
          inventoryDb.end();
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
        cartDb.end();
        return res.status(500).send("Internal Server Error");
      } else {
        cartDb.end();
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

          response.category = { category: req.body.category };


          res.send(response);
          invdb.end();
          db.end();


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
      cartadd.end();
      return res.status(500).send("Internal Server Error");
    } else {
      cartadd.end();
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




  const response = [];

  struct.query('SELECT * FROM header', (err, headerResult) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    response.push(...headerResult);

    struct.query('SELECT * FROM body', (err, bodyResult) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      response.push(...bodyResult);

      struct.query('SELECT * FROM footer', (err, footerResult) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        response.push(...footerResult);
        struct.query('SELECT * FROM div_table', (err, divResult) => {
          if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
          }
          response.push(...divResult);
  

        res.send(response);
        struct.end();

      });
    });
  });
});
});

app.post('/custcom/update', (req, res) => {
  const struct = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "homepage",
  });
const newData  = req.body;
const sql = `UPDATE ${newData.table} SET bg_color='${newData.bg_color}', color='${newData.color}', content='${newData.content}', font_family='${newData.font_family}', font_size='${newData.font_size}', href='${newData.href}', src='${newData.src}', text_decoration='${newData.text_decoration}' WHERE id='${newData.id}'`;


 struct.query(sql, (err, headerResult) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }
  });

  res.send(req.body);

  struct.end();
});

app.post('/custcom/update/div', (req, res) => {
  const struct = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "homepage",
  });
const newData  = req.body;
const sql = `UPDATE div_table SET bg_color='${newData.bg_color}' WHERE id='${newData.id}'`;


 struct.query(sql, (err, divResult) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }
  });

  res.send(req.body);

  struct.end();
});


app.get('/custcom/inven', (req, res) => {
  const connection = mysql.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'inventory',
  });
  const queryBooks = "SELECT *, 'books' AS category FROM books";
  const queryElectronics = "SELECT *, 'electronic' AS category FROM electronic";
  const queryGrocery = "SELECT *, 'grocery' AS category FROM grocery";

  let booksData, electronicsData, groceryData;

  connection.query(queryBooks, (errorBooks, resultsBooks) => {
    if (errorBooks) {
      console.error('Error fetching books data:', errorBooks);
      res.status(500).send({ error: 'Error fetching books data' });
      connection.end();
      return;
    }

    booksData = resultsBooks;

    connection.query(queryElectronics, (errorElectronics, resultsElectronics) => {
      if (errorElectronics) {
        console.error('Error fetching electronics data:', errorElectronics);
        res.status(500).send({ error: 'Error fetching electronics data' });
        connection.end();
        return;
      }

      electronicsData = resultsElectronics;

      connection.query(queryGrocery, (errorGrocery, resultsGrocery) => {
        if (errorGrocery) {
          console.error('Error fetching grocery data:', errorGrocery);
          res.status(500).send({ error: 'Error fetching grocery data' });
          connection.end();
          return;
        }

        groceryData = resultsGrocery;

        connection.end();
        const inventoryData = {
          books: booksData,
          electronic: electronicsData,
          grocery: groceryData,
        };
        res.send(inventoryData);
      });
    });
  });
});



const inv_storage = multer.diskStorage({
  destination: (req, file, cb) => {
   console.log(req);
    let uploadPath = path.join(__dirname, '../client/src/components/inventory_imgs/others');
    if (req.body.category === 'books') {
      uploadPath = path.join(__dirname, '../client/src/components/inventory_imgs/books');
    } else if (req.body.category === 'electronic') {
      uploadPath =path.join(__dirname, '../client/src/components/inventory_imgs/electronic');
    } else if (req.body.category === 'grocery') {
      uploadPath =path.join(__dirname, '../client/src/components/inventory_imgs/grocery');
    }
      cb(null, uploadPath);
   
  },
 

  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
 
});
const inv_upload = multer({ storage: inv_storage }).single('img');


app.post('/custcom/inven/add', (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'inventory',
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL server:', err);
      return;
    }
    console.log('Connected to MySQL server');
  });

  inv_upload(req,res,(err)=>{
    if(err){res.send(err);
    }else{
  const { pid, pname, price,img_name, offer,mrp, desc, rating, stock, category } = req.body;

  const query = `INSERT INTO ${category} (pid, pname, img, price, offer, mrp, \`desc\`, rating, stock, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [pid,pname,img_name, price, offer,mrp, desc, rating, stock,category],
    (err, result) => {
      if (err) {
        console.error('Error inserting data into the table:', err);
        return res.sendStatus(500);
        
      }
      res.sendStatus(200).send("Successfully added");
      connection.end();
      
    }
  );}});
});

const edit_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, '../client/src/components/images');
      cb(null, uploadPath);
   
  },
 

  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
 
});
const edit_upload = multer({ storage: edit_storage }).single('img');

app.post('/custcom/update/img', (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'homepage',
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL server:', err);
      return;
    }
    console.log('Connected to MySQL server');
  });

  edit_upload(req,res,(err)=>{
    if(err){res.send(err);
    }else{
  const {id,table,img_name } = req.body;

  const query = `UPDATE ${table} SET src='${img_name}' WHERE id = '${id}';`;

  connection.query(
    query,
    (err, result) => {
      if (err) {
        console.error('Error in updating table:', err);
        return res.sendStatus(500);
        
      }
      res.send("Successfully Updated");
      connection.end();
      
    }
  );
}
});
});



