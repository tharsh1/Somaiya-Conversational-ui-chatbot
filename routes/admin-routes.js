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

router.post('/get_answer' , (req,res)=>{
    console.log(req.body.option);
    var result = adminController.get_answer(req.body.option);
    result.then((data)=>{
        console.log(data);
        res.send(data);
    });
    result.catch((err)=>{
        console.log('answer');
    })
});

router.post('/update_question' , (req,res)=>{
    var result = adminController.updateQuestion(req.body.id,req.body.value);
    result.then((data)=>{
        res.send({status:1});
    })
    .catch((error)=>{
        res.send({status:0,message:error})
    })
});

router.post('/update_answer' , (req,res)=>{
    var result = adminController.updateAnswer(req.body.id,req.body.value);
    result.then((data)=>{
        res.send({status:1});
    })
    .catch((error)=>{
        res.send({status:0,message:error})
    })
})


router.post('/update_option' , (req , res)=>{
    adminController.updateOption(req.body.id , req.body.value)
    .then(()=>{
        res.send({status:1});
    })
    .catch((error)=>{
        res.send({
            status: 0,
            message: error
        });
    })
});
router.post('/add_option' , (req,res)=>{
    adminController.addOption(req.body.optionName , req.body.forQuestion)
    .then((data)=>{
        res.send({
            status: 1,
            message: "option inserted successfully",
            meta: data
        });
    })
    .catch((error)=>{
        res.send({
            status: 0,
            message: error
        })
    });
});

module.exports = router;