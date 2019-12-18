var express = require('express');
var router = express.Router();
const path = require('path');
var bodyParser = require('body-parser');
var adminController = require('../controllers/adminFuncs');
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));



router.get("/",(req,res)=>{
    res.sendfile(path.resolve(path.join(__dirname + '/../views/html/admin_dash.html')));
});

router.post('/get_question_data', (req,res)=>{
    // console.log(req.body.id);
    
    adminController.get_question(req.body.id)
    .then((question)=>{
        adminController.get_options(req.body.id)
        .then((options)=>{
            res.send({'question':question[0] , 'options':options});
        })
        .catch((error)=>{

        });
    })
    .catch((error)=>{
        console.log(error);
    });
});

module.exports = router;