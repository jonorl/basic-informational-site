let fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

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
