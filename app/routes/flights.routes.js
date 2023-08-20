module.exports = app => {
  const Flights = require("../controllers/flights.controller.js");

  var router = require("express").Router();

  // Create a new Flight
  router.post("/", Flights.create);

  // Retrieve all Flights
  router.get("/", Flights.findAll);

  // Retrieve By JSON Data
  router.post("/search", Flights.search);

  // Retrieve By Params
  router.get("/findFlights/:From/:To", Flights.findFlights);

  // Retrieve all published Flights
  router.get("/published", Flights.findAllPublished);

  // Retrieve a single Flight with id
  router.get("/:id", Flights.findOne);

  // Update a Flight with id
  router.put("/:id", Flights.update);

  // Delete a Flight with id
  router.delete("/:id", Flights.delete);

  // Create a new Flight
  router.delete("/", Flights.deleteAll);

  //Create a new reservation
  router.post("/reserve",Flights.reserve);

  app.use("/api/Flights", router);
};
