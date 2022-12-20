const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const { render } = require("ejs");

const app = express();

const listItems = ["Your list"];
const workItems = ["Work list"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  // res.send("Server is running ");
  // const day = date.getDay();
  const day = date.getDay();

  res.render("list", { listTitle: day, newListItems: listItems });
});

app.post("/", function(req, res) {
  const listItem = req.body.newList;
  console.log(req.body);
  // console.log(listItems);
  if (req.body.list === "Work") {
    workItems.push(listItem);
    res.redirect("/work");
  } else {
    if (listItem.length > 0) {
      listItems.push(listItem);
    } else {
      console.log("Item not found");
    }
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function(req, res) {
  const item = req.body.newList;
  if (item.length > 0) {
    workItems.push(item);
  } else {
    console.log("Item is not Found");
  }
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on Port 3000");
});
