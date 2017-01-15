var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/transaction', function(req, res) {
  var responseObject =  { message: "Get Transaction Page" };
  res.send(responseObject);
});



router.post('/getTransaction', function(req, res, next) {
	console.log('savedata called');
    console.log(req.body);
    //var id = req.body.Request_id;
    var userA = req.body.User_A;
    var userB = req.body.User_B;
    var sellerA = req.body.Seller_A;
    var sellerB = req.body.Seller_B;    
    var pointA = req.body.Ex_points_A;
    var pointB = req.body.Ex_points_B;
    console.log(req.body.User_A);

	var responseObject =  { "message": "Transaction accepted",
							"respond": true };
	res.send(responseObject);
});


module.exports = router;
