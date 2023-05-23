const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const connection = mysql.createConnection({
  host: "jtb9ia3h1pgevwb1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "njw7khrjjxkwz75p",
  password: "kg2nnccbk059tmz0",
  database: "vakcfmsgycgqfyf8",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database!");
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const { email = "", password = "" } = req.body;
  connection.query(
    `SELECT * FROM user where email='${email}' AND password='${password}'`,
    (err, rows) => {
      if (err) {
        console.error("Error executing the query: ", err);
        res.status(500).send("Error fetching data from the database");
        return;
      }
      if (rows[0]) {
        res.json(rows[0]);
      } else {
        res.status(404).send("Error not found user");
      }
    }
  );
});

app.post("/signup", (req, res) => {
  const { name = "", email = "", password = "" } = req.body;
  connection.query(
    `INSERT INTO user (name, email, password) VALUES ( '${name}', '${email}', '${password}')`,
    (err, rows) => {
      if (err) {
        console.error("Error executing the query: ", err);
        res.status(500).send("Error fetching data from the database");
        return;
      }
      if (rows.affectedRows == 1) {
        res.status(200).send(`${rows.insertId}`);
      } else {
        res.status(500).send("Error insert user");
      }
    }
  );
});

app.get("/user", (req, res) => {
  const { id = "" } = req.query;
  connection.query(`SELECT * FROM user where id='${id}'`, (err, rows) => {
    if (err) {
      console.error("Error executing the query: ", err);
      res.status(500).send("Error fetching data from the database");
      return;
    }
    if (rows[0]) {
      res.json(rows[0]);
    } else {
      res.status(404).send("Error not found user");
    }
  });
});

app.post("/update-profile", (req, res) => {
  const {
    name = "",
    email = "",
    password = "",
    phoneNumber = "",
    id = "",
  } = req.body;
  connection.query(
    `UPDATE user SET name = '${name}', email = '${email}', password = '${password}', phone_number = '${phoneNumber}' WHERE id = '${id}'`,
    (err, rows) => {
      if (err) {
        console.error("Error executing the query: ", err);
        res.status(500).send("Error fetching data from the database");
        return;
      }
      if (rows.affectedRows == 1) {
        res.status(200).send('success');
      } else {
        res.status(500).send("Error update user");
      }
    }
  );
});

app.post("/update-location", (req, res) => {
  const {
    cardId = "",
    location = "",
    province = "",
    zipcode = "",
    id = "",
  } = req.body;
  connection.query(
    `UPDATE user SET card_id = '${cardId}', location = '${location}', province = '${province}', zipcode = '${zipcode}' WHERE id = '${id}'`,
    (err, rows) => {
      if (err) {
        console.error("Error executing the query: ", err);
        res.status(500).send("Error fetching data from the database");
        return;
      }
      if (rows.affectedRows == 1) {
        res.status(200).send('success');
      } else {
        res.status(500).send("Error update user");
      }
    }
  );
});

app.post("/update-record", (req, res) => {
  const {
    q1 = "",
    q2 = "",
    q3 = "",
    q4 = "",
    q5 = "",
    id = "",
  } = req.body;
  connection.query(
    `UPDATE user SET q1 = '${q1}', q2 = '${q2}', q3 = '${q3}', q4 = '${q4}', q5 = '${q5}' WHERE id = '${id}'`,
    (err, rows) => {
      if (err) {
        console.error("Error executing the query: ", err);
        res.status(500).send("Error fetching data from the database");
        return;
      }
      if (rows.affectedRows == 1) {
        res.status(200).send('success');
      } else {
        res.status(500).send("Error update user");
      }
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
