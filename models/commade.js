var mongoose = require('./bdd')

var commandeSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
  });
  
  var commandeModel = mongoose.model('commandes', commandeSchema);

module.exports = commandeModel;