const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/genyDB", { useNewUrlParser: true });

const schema = {
  name: String,
  hobbies: [String],
};

const geny = mongoose.model("Users", schema);

app
  .route("/users")

  .get((req, res) => {
    geny.find((err, foundUsers) => {
      if (err) {
        console.log(err);
      } else {
        res.send(foundUsers);
      }
    });
  })

  .post((req, res) => {
    console.log(req.body.name);
    console.log(req.body.hobbies);

    const newUser = new geny({
      name: req.body.name,
      hobbies: req.body.hobbies,
    });

    newUser.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Successfully added");
      }
    });
  })

  .delete((req, res) => {
    geny.deleteMany((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Successfully deleted all");
      }
    });
  });

app
  .route("/users/:userName")

  .get((req, res) => {
    geny.findOne({ name: req.params.userName }, (err, foundUser) => {
      if (foundArticle) {
        res.send(foundUser);
      } else {
        res.send("no matching user");
      }
    });
  })

  .put((req, res) => {
    geny.update(
      { name: req.params.userName },
      { name: req.body.name, hobbies: req.body.hobbies },
      { overwrite: true },
      (err) => {
        if (!err) {
          res.send("Successfully Updated");
        } else {
          console.log(err);
        }
      }
    );
  })
  .patch((req, res) => {
    geny.update(
      { name: req.params.userName },
      { $set: req.body },
      { overwrite: true },
      (err) => {
        if (!err) {
          res.send("Successfully Updated");
        } else {
          console.log(err);
        }
      }
    );
  });

app.listen(3000, () => {
  console.log("Server started on 3000");
});
