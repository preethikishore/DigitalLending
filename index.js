const express = require("express");
const https = require("https");
const fetch = require("node-fetch");
const ejs = require("ejs");
const app = express();
var _ = require("lodash");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let access_token;
let panStatus;

app.get("/", function (_req, res) {
  res.render("pan", {
    panNum: "",
    personName: "",
    message: "",
    panStatus: "",
  });
});

app.get("/pan", function (_req, res) {
  res.render("pan", {
    panNum: "",
    personName: "",
    message: "",
    panStatus: "",
  });
});

app.get("/aadhar", function (_req, res) {
  res.render("aadhar", {
    aadharNum: "",
    uidStatus: "",
  });
});

app.get("/cin", function (_req, res) {
  res.render("cin");
});

app.get("/ifsc", function (_req, res) {
  res.render("ifsc", {
    ifsc: "",
    bank: "",
    micr: "",
    branch: "",
    state: "",
  });
});

app.get("/bank", function (_req, res) {
  res.render("bank", {
    accHolderName: "",
    referenceId: "",
    message: "",
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server Listening");
});
