const db = require("../models");
const users = db.users;

// Create and Save a new Flight
exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.Username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a user
  const user = new users({
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email, 
    DOB: req.body.DOB,
    Name: req.body.Name
  });

  // Save Flight in the database
  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Flights from the database.
exports.findAll = (req, res) => {
  
console.log("Finding all...");
  users.find()
    .then(data => {
      console.log("Found "+data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Flights."
      });
    });
};

// Find a single Flight with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  users.findById(Username)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Flight with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Flight with id=" + id });
    });
};

exports.search = (req, res) => {
  //const id = req.params.id;
  console.log("Search for "+req.body.Username);
  users.findOne(req.body)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      /*res
        .status(500)
        .send({ message: "Error retrieving Flight with id=" + id });
        */
       res.send("{}");
    });
};
// Update a Flight by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Flight with id=${id}. Maybe Flight was not found!`
        });
      } else res.send({ message: "Flight was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Flight with id=" + id
      });
    });
};

// Delete a Flight with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  users.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Flight with id=${id}. Maybe Flight was not found!`
        });
      } else {
        res.send({
          message: "Flight was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Flight with id=" + id
      });
    });
};

// Delete all Flights from the database.
exports.deleteAll = (req, res) => {
  users.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Flights were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Flights."
      });
    });
};

// Find all published Flights
exports.findAllPublished = (req, res) => {
  users.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Flights."
      });
    });
};
exports.login = (req, res) => {
    //const id = req.params.id;
    console.log("Search for "+req.body.Username);
    users.findOne(req.body)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with that username!"});
        else {
            console.log("result: "+data);
            var uname = data.Username;
            var pwd = data.Password;
            console.log("Found user: "+uname);
            if(req.body.Username==uname && req.body.Password==pwd)
                res.send(data.Username+" Found registered user! ");
            else
                res.send("Unregistered user!");
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User" });
          
        // res.send("{}");
      });
  };
