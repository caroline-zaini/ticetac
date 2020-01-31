var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journey');
var userModel = require('../models/users');
var commandeModel = require('../models/commade')


/* GET login. */
router.get('/', function(req, res, next) {
 
  res.render('index', {  });
});

router.post('/sign-in', async function(req, res, next) {

    var utilisateur = await userModel.findOne({
        email: req.body.email,
        password: req.body.password
    });
    
    if (utilisateur == null) {
        res.redirect('/');
    } else {

      req.session.user = {
        email: utilisateur.email,
        id: utilisateur._id
      }

        res.redirect('/home');
    }
});


router.post('/sign-up', async function(req, res, next) {

  var user = await userModel.findOne({
    email: req.body.email
  }); 
  
  if(!user && req.body.email != '') {
  var newUser = new userModel({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password
    });
    await newUser.save();

    req.session.user = {
      email: utilisateur.email,
      id: utilisateur._id
    }

    res.redirect('/home');
  } else {

    
    res.redirect('/');

  }
     
} 
);

      
router.post('/confirm', async function(req, res, next) {

  var travel = await journeyModel.findById(req.body.id)
 
    var commande = [];
  commande.push({
    departure: travel.departure,
    arrival: travel.arrival,
    date: travel.date,
    departureTime: travel.departureTime,
    price: travel.price
  })
 
  req.session.commande = commande

    res.render('confirm', { commande });
  }); 
   


/* GET home page. */
router.get('/home', async function(req, res, next) {

  var journey = await journeyModel.find()

  res.render('homepage', {});
});





/* GET home page. */
router.post('/resa', async function(req, res, next) {

  var departure = req.body.departure[0].toUpperCase()+req.body.departure.slice(1);
  var arrival = req.body.arrival[0].toUpperCase()+req.body.arrival.slice(1)
  console.log(departure)
  console.log(arrival)
 // trouve un élément dont le departure a comme valeur le nom de la ville du formulaire :
 var selectJourney = await journeyModel.find({
  departure: departure,
  arrival: arrival,
  date: req.body.date
});


 // Si tu trouves le depart dans la BDD:
  if (selectJourney != null) {
    res.render('resa', {selectJourney});
  } else {
    res.render('notrain');
  }

});

/* GET error page. */
router.get('/notrain', function(req, res, next) {

  res.render('notrain');
});

router.get('/historic', async function(req, res, next) {

  var lastTrip = await commandeModel.find();

  res.render('historic', {lastTrip});
});


router.get('/payment', async function(req, res, next) {


  for(i=0; i<req.session.commande.length; i++)
  var booking = await new commandeModel({
    departure: req.session.commande[i].departure,
    arrival: req.session.commande[i].arrival,
    date: req.session.commande[i].date,
    departureTime: req.session.commande[i].departureTime,
    price: req.session.commande[i].price
  });

   await booking.save();

  res.redirect('/home');
});

router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

       
      }
    )

  }


  res.render('index', { title: 'Express' });
});

module.exports = router;
