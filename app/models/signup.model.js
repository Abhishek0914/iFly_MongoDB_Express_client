module.exports = mongoose => {
    var schema = mongoose.Schema(
      {    
        Username: String,
        Password: String,
        Name: String,
        Email: String,
        DOB: String,         
      },
      { timestamps: true }
    );

  
    schema.method("toJSON", function() {
      const { __v, _id,Username,Password,Email,DOB, ...objects } = this.toObject();
      objects.id = _id;
      objects.Username=Username;
      objects.Password=Password;
      objects.Email=Email;
      objects.Name=Name;
      objects.DOB=DOB
      return objects;
    });
  
    const reservations = mongoose.model("users", schema);
    return reservations;
  };
  