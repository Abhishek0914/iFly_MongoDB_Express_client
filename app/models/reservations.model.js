module.exports = mongoose => {
    var schema = mongoose.Schema(
      {    
        Firstname: String,
        Lastname: String,
        Middlename: String,
        Email: String,
        Phone: String,
        Cardnumber: String,
        Expirydate: String,
        Securitycode: String,
        Flightid: String         
      },
      { timestamps: true }
    );

  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const reservations = mongoose.model("reservations", schema);
    return reservations;
  };
  