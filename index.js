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

const urlpan = "https://sandbox.aadhaarkyc.io/api/v1/pan/pan";
var surepass_post = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNTc0NTMwNiwianRpIjoiNGE4ZmYxN2EtYzEwMy00Y2VjLWI1OGItOGZkMDUxNzQyZjdlIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnNydmluZm90ZWNoQGFhZGhhYXJhcGkuaW8iLCJuYmYiOjE2MjU3NDUzMDYsImV4cCI6MTYyODMzNzMwNiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInJlYWQiXX19.DYdv0yltgiZ3hOvMZ1rxDMT62LWwH4TBgdvLyP3CUus",
    Accept: "application/json",
  },
};

app.get("/", function (req, res) {
  res.render("pan", {
    panNum: "",
    personName: "",
    message: "",
    panStatus: "",
  });
  console.log("main");
});

app.get("/pan", function (req, res) {
  res.render("pan", {
    panNum: "",
    personName: "",
    message: "",
    panStatus: "",
  });
  console.log("pan");
});

app.post("/pan", function (req, res) {
  let pannumber = req.body.pan;
  pannumber = pannumber.trim().toUpperCase();
  console.log(pannumber);
  surepass_post["body"] = JSON.stringify({
    id_number: pannumber,
  });
  fetch(urlpan, surepass_post)
    .then((res) => res.json())
    .then((d) => {
      try {
        panStatus = d.success;
        let statusMsg;
        if (panStatus) {
          statusMsg = "Verified Successfully";
        } else {
          statusMsg = "Failed, Check PAN #";
        }
        res.render("pan", {
          panNum: d.data.pan_number,
          personName: d.data.full_name,
          message: statusMsg,
          panStatus: panStatus,
        });
        console.log("Post");
      } catch (e) {
        res.redirect("/pan");
        console.log("not valid data");
        alert.message("Please Enter Valid PAN");
      }
    });
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server Listening");
});
