var mongoose = require('./bdd')

var commandeSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
  });
  
  var commandeModel = mongoose.model('commandes', commandeSchema);

module.exports = commandeModel;