var express = require('express');
var router = express.Router();
const path = require('path');
const chatController = require('../controllers/chat_db_funcs');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 

router.get('/start',(req,res)=>{
    var result = chatController.start_conv();
    result.then((data)=>{
        res.send(data[0].question)
    });
    result.catch((err)=>{
        console.log('start');
    });
});
router.post('/get_options',(req,res)=>{
    var result = chatController.get_options(req.body.next_options);
    result.then((data)=>{
        res.send(data)
    });
    result.catch((err)=>{
        console.log('get option');
    });
});

router.post('/next_question',(req,res)=>{
    var result = chatController.next_question(req.body.next_question);
    result.then((data)=>{
        res.send(data[0]);
    });
    result.catch((err)=>{
        console.log('here');
    });
});

router.post('/answer' , (req,res)=>{
    console.log(req.body.option);
    var result = chatController.get_answer(req.body.option);
    result.then((data)=>{
        console.log(data);
        res.send(data[0].answer);
    });
    result.catch((err)=>{
        console.log('answer');
    })
});

module.exports = router;