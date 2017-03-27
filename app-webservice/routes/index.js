var express = require('express');
var router = express.Router();

/*var app = express();
var http = require('http').Server(app);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

var my_cc;

 // Step 1 ================================== 
    var Ibc1 = require('ibm-blockchain-js');
    var ibc = new Ibc1(/*logger*/);             //you can pass a logger such as winston here - optional 
    var chaincode = {};
 
    // ================================== 
    // configure ibc-js sdk 
    // ================================== 
    var options =   {
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
            zip_url: 'https://github.com/pagito/CCPE-Blockchain/raw/master/chaincode/ccpe_chaincode.zip',
            unzip_dir: '/',
            git_url: 'https://github.com/pagito/CCPE-Blockchain/chaincode',
            deployed_name: null
            //deployed_name:'df9b6b3af9acd15fe6c9024a5b23c6deb7ded24bfaa2e95494ccca6e594a9746077dcb81a00cd67ebb4fbbab9e801ce20803cc28174ca8a51628c1ba9612729a'
        }
    };
    
    // Step 2 ================================== 
    ibc.load(options, cb_ready);
 
    // Step 3 ==================================
    function cb_ready(err, cc){                             //response has chaincode functions
        //app1.setup(ibc, cc);
        //app2.setup(ibc, cc);

    // Step 4 ==================================
        if(err != null){
            console.log('! looks like an error loading the chaincode or network, app will fail\n', err);
            if(!process.error) process.error = {type: 'load', msg: err.details};                //if it already exist, keep the last error
        } else {
            
            

            if(!cc.details.deployed_name || cc.details.deployed_name === ''){                //decide if I need to deploy or not
                //console.log("Ready, but do not deploy yet");
                my_cc = cc;
                cc.deploy('init', ['99'], {save_path: './cc_summaries', delay_ms: 30000}, function(e){                    //delay_ms is milliseconds to wait after deploy for conatiner to start, 50sec recommended
                    console.log("success deployed");
                    cb_deployed();
                });
            }
            else{
                my_cc = cc;
                console.log("chaincode hash: " + cc.details.deployed_name);
                console.log('chaincode summary file indicates chaincode has been previously deployed');
             
                cb_deployed();
            }
        }
    }

    // Step 5 ==================================
    function cb_deployed(err){
        console.log('sdk has deployed code and waited');
        //my_cc.invoke.Init("Forza Juve!");
        //console.log('Init done');
        //my_cc.query.read(['dummy_query']);
        //console.log('Query done');
        //http.listen(8088, function(){
          console.log('listening on *:3000');
          
        //});
    }


    /*ibc.chain_stats(function(e, stats){
        console.log('got some stats', stats);
    });*/

    /*ibc.get_transaction('d30a1445-185f-4853-b4d6-ee7b4dfa5534', function(err, data){
        console.log('found trans', err, data);
    });*/


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
    
    var id = req.body.Transaction_id;
    var userA = req.body.User_A;
    var userB = req.body.User_B;
    var sellerA = req.body.Seller_A;
    var sellerB = req.body.Seller_B;    
    var pointA = req.body.Ex_points_A;
    var pointB = req.body.Ex_points_B;
    var prev_trans_id_A = req.body.Prev_Transaction_ID_A;
    var prev_trans_id_B = req.body.Prev_Transaction_ID_B;
    //console.log(req.body.User_A);

	var curret_date = new Date();
    var dateStr = curret_date.getFullYear()+''+(curret_date.getMonth()+1)+''+curret_date.getDate();
    console.log("date1: " + dateStr);
    console.log("date2: " + Date.parse(new Date()));
    var tmpID = sellerA+'-'+sellerB+'-'+dateStr+'-'+id;
    console.log("Generated id / tmpID / not used :" + tmpID);
    console.log("Order id: " + id);
    my_cc.invoke.init_transaction([id,userA,userB,sellerA,sellerB,pointA,pointB, prev_trans_id_A, prev_trans_id_B, dateStr],function(err, data) {

        var succ_data = data;
        res.json({
            "msg":succ_data,
            "respond":true,
            "record_id":id
        });

        //var responseObject = { "message": succ_data }
        //res.send(responseObject);

        console.log('Returned data success',succ_data);
        //console.log(succ_data);
    });

    //var responseObject =  { "message": "Transaction accepted",
							//"respond": true };
	//res.send(responseObject);

    console.log('savedata called');
});


// Get Chain stats
router.get('/chain_stats', function(req, res){
    console.log('got stat request');
    ibc.chain_stats(function(e, stats){
        console.log('got some stats', stats);
        res.json({"stat": stats});              
    });
});

/*
// Query Points
router.get('/query_point', function(req, res){
    console.log('got read request');
    my_cc.query.read(['read','_pointindex'],function(err,resp){
        if(!err){
            //var ss = resp.result.message;
            res.json(JSON.parse(resp));
            console.log('success',resp);  
        }else{
            console.log('fail');
        }
    });
});
*/
/*
// TEST
router.post('/testPost',function(req,res){
        var foo = req.body.foo;
        var bar = req.body.BOO;
        res.json({"foo":foo,"BOO":bar});
});*/

/*
// Init Point
router.post('/init_point', function(req, res){
    var seller = req.body.seller;
    var owner = req.body.owner;
    var curret_date = new Date();
    var dateStr = curret_date.getFullYear()+''+curret_date.getMonth()+''+curret_date.getDate();
    console.log('got init_marble request');
    g_cc.invoke.init_point([seller+'-'+dateStr+'-',owner],function(err,resp){
        var ss = resp;
        res.json({"msg":ss});
        console.log('success',ss);  
    });
});
*/

module.exports = router;
