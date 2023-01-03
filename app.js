const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash");
const { render } = require("ejs");

mongoose.set("strictQuery", false);
const app = express();

const Database = "todoListDB";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(`mongodb://localhost:27017/${Database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemsSchema = {
  name: String
};

const Items = new mongoose.model("items", itemsSchema);

const item1 = new Items({
  name: "Welcome to your todoList"
});
const item2 = new Items({
  name: "Hit the + button to add new Item"
});
const item3 = new Items({
  name: "<-- Hit this to delete an Item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
  // const day = date.getDay();
  Items.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      Items.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully added your default items to DB");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today list", newListItems: foundItems });
    }
  });
});

app.post("/", function(req, res) {
  const itemName = req.body.newList;
  const listName = req.body.list;

  const item = new Items({
    name: itemName
  });

  if (listName === "Today list") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
  /* if (itemName.length > 0) {
    const item = new Items({
      name: itemName
    });
    item.save();
    res.redirect("/");
  } else {
    res.redirect("/");
    console.log("Ooops! item not found!");
  } */
});

app.post("/delete", function(req, res) {
  const checkItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today list") {
    Items.findByIdAndRemove(checkItemId, function(err) {
      if (!err) {
        console.log("Item is deleted");
        res.redirect("/");
      } else {
        console.log(err);
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkItemId } } },
      function(err, foundList) {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});

// Dynamic routing
app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  // when we search any URL its add in customListName

  List.findOne({ name: customListName }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        // creating new List
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // printing existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  });
});

/* app.get("/work", function(req, res) {
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
}); */
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on Port 3000");
});
