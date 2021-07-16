// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

let notedata= []

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({extended: true,}));
app.use(express.static(path.join(__dirname, "public")));

//Write Note
app.post("/api/notes", function (req, res) {
    notedata = fs.readFileSync("./db/db.json", "utf8");
    console.log(notedata);
    notedata = JSON.parse(notedata);
    req.body.id = notedata.length;
    notedata.push(req.body);
    notedata = JSON.stringify(notedata);
    fs.writeFile("./db/db.json", notedata, "utf8", function (err) {
      if (err) throw err;
    });
    res.json(JSON.parse(notedata));
});

//Read Note
app.get("/api/notes", function (err, res) {
  if (err) {throw err;}
  notedata = fs.readFileSync("db/db.json", "utf8");
  console.log("Read Notes Working");
  notedata = JSON.parse(notedata);
  res.json(notedata);
});


//HTML Routes

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "db/db.json"));
});

// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  