const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var listItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  // res.send("Server is running ");
  var today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var currentDate = today.toLocaleDateString("en-US", options);
  res.render("list", { kindOfDay: currentDate, newListItems: listItems });
});

app.post("/", function(req, res) {
  const listItem = req.body.newList;
  // console.log(listItems);
  if (listItem.length > 0) {
    listItems.push(listItem);
  } else {
    console.log("Item not found");
  }
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on Port 3000");
});
