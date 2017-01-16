var express = require('express');
var router = express.Router();


 // Step 1 ================================== 
    var Ibc1 = require('ibm-blockchain-js');
    var ibc = new Ibc1(/*logger*/);             //you can pass a logger such as winston here - optional 
    var chaincode = {};
 
    // ================================== 
    // configure ibc-js sdk 
    // ================================== 
/*    var options =   {
        network:{
            peers:   [{
                "api_host": "172.17.0.2",
                "api_port": 7050,
                //"api_port_tls": xxx,
                //"id": "xxxxxx-xxxx-xxx-xxx-xxxxxxxxxxxx_vpx"
                "id": "app_peer"
            }],
            users:  [{
                "enrollId": "test_user0",
                "enrollSecret": "MS9qrN8hFjlE"
            }],
            options: {              //this is optional 
                quiet: true, 
                timeout: 60000,
                tls: false,
            }
        },
        chaincode:{
            zip_url: 'https://github.com/ibm-blockchain/marbles-chaincode/archive/master.zip',
            unzip_dir: 'marbles-chaincode-master/part2_v1.0.0',
            git_url: 'https://github.com/ibm-blockchain/marbles-chaincode/part2_v1.0.0'
        }
    };
    
    // Step 2 ================================== 
    ibc.load(options, cb_ready);
 
    // Step 3 ================================== 
    function cb_ready(err, cc){               //response has chaincode functions 
        //app1.setup(ibc, cc);
        //app2.setup(ibc, cc);
    
    // Step 4 ================================== 
        if(cc.details.deployed_name === ""){        //decide if I need to deploy or not 
            cc.deploy('init', ['99'], null, cb_deployed);
        }
        else{
            console.log('chaincode summary file indicates chaincode has been previously deployed');
            cb_deployed();
        }
    }
 
    // Step 5 ================================== 
    function cb_deployed(err){
        console.log('sdk has deployed code and waited');
        chaincode.query.read(['a']);
    }*/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Example of GET method, simple respond with a string */
router.get('/transaction', function(req, res) {
  var responseObject =  { message: "Get Transaction Page" };
  res.send(responseObject);
});



/* Get POST data coming from Exchange APP */
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
    //console.log(req.body.User_A);

	var responseObject =  { "message": "Transaction accepted",
							"respond": true };
	res.send(responseObject);
});


module.exports = router;
