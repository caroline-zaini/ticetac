var mongoose = require('./bdd')

var selectJourneySchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
  });
  
  var selectJourneyModel = mongoose.model('selectJourneySchema', selectJourneySchema);

module.exports = selectJourneyModel