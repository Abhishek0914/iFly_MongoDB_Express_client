module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Flight
    router.post("/", users.create);
  
    // Retrieve all Flights
    router.get("/", users.findAll);
  
    // Retrieve By JSON Data
    router.post("/search", users.search);
  
     // Retrieve a single Flight with id
    router.get("/:id", users.findOne);
  
    // Update a Flight with id
    router.put("/:id", users.update);
  
    // Delete a Flight with id
    router.delete("/:id", users.delete);
  
    // Create a new Flight
    router.delete("/", users.deleteAll);

    //Login Route
    router.post("/login", users.login);

   // router.post("/signup",users.signup);
  
    app.use("/api/users", router);
  };
  