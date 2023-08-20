module.exports = mongoose => {
    var schema = mongoose.Schema(
      {    
        Username: String,
        Password: String,         
      },
      { timestamps: true }
    );

  
    schema.method("toJSON", function() {
      const { __v, _id,Username,Password, ...objects } = this.toObject();
      objects.id = _id;
      objects.Username=Username;
      objects.Password=Password;
      return objects;
    });
  
    const login = mongoose.model("login", schema);
    return login;
  };
  