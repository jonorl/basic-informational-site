let fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 3001;

// This is to make index work when there's no paths
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// Dynamically search if a html file matching the path name exists, if not send 404.html
app.get("/:URLpath", (req, res) => {
  let URLpath = req.url.substring(1) + ".html";

  try {
    fs.statSync(URLpath).isFile();
    res.sendFile(path.join(__dirname, URLpath));
  } catch (err) {
    res.sendFile(path.join(__dirname, "404.html"));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
