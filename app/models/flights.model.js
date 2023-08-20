module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      Carrier: String,
      From: String,
      To: String,
      Dep: String,
      Arr: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Flight = mongoose.model("Flights", schema);
  return Flight;
};
