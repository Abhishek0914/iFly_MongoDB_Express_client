module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        Username: String,
        Password: String,
        Name: String,
        Email: String,
        DOB: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const users = mongoose.model("users", schema);
    return users;
  };
  