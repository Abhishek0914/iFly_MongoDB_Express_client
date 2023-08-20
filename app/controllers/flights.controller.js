const db = require("../models");
const flights = db.Flights;
const reserves = db.reservations;

// Create and Save a new Flight
exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Flight
  const flight = new flights({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Flight in the database
  flights
    .save(flight)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Flight."
      });
    });
};

exports.reserve=(req,res)=>{
  //console.log("Reserve for: "+req.body.Username);
  //console.log(req.body);
  // Validate request
  if (!req.body.Flightid) {
    res.status(400).send({ message: "FlightId can not be empty!" });
    return;
  }
// Create a resevation
const booking = new reserves({
  Firstname: req.body.Firstname,
  Lastname: req.body.Secondname,
  Middlename: req.body.Middlename,
  Email: req.body.Email,
  Phone: req.body.Phone,
  Cardnumber: req.body.Cardnumber,
  Expirydate: req.body.Expirynumber,
  Securitycode: req.body.Securitycode,
  Flightid: req.body.Flightid
});

console.log(booking);

// Save reservation in the database
booking.
  save()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while reserving the flight."
    });
  });
  
};


// Retrieve all Flights from the database.
exports.findAll = (req, res) => {
  
console.log("Finding all...");
  flights.find()
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

  flights.findById(id)
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
  console.log("Search for "+req.body.Carrier);
  flights.findOne(req.body)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Flight with id " + id });
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


exports.findFlights = (req, res) => {
  //const id = req.params.id;
  console.log(req.params);
  var fromVal = req.params.from;
  var toVal = req.params.to;
 
  flights.find(req.params)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Flight " });
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

  flights.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  flights.findByIdAndRemove(id, { useFindAndModify: false })
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
  flights.deleteMany({})
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
  flights.find({ published: true })
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


