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
    adminController.get_question(req.body.id)
    .then((question)=>{
        adminController.get_options(req.body.id)
        .then((options)=>{
            res.send({code: 1 ,'question':question[0] , 'options':options});
        })
        .catch((error)=>{
            res.send({code:0 , message:error});
        });
    })
    .catch((error)=>{
        res.send({code:0 , message:error});
    });
});

router.post('/get_answer' , (req,res)=>{
    console.log(req.body.option);
    var result = adminController.get_answer(req.body.option);
    result.then((data)=>{
        res.send({code:1 , data:data[0]});
    });
    result.catch((err)=>{
        res.send({code:0 , message:err});
    })
});

router.post('/update_question' , (req,res)=>{
    var result = adminController.updateQuestion(req.body.id,req.body.value);
    result.then((data)=>{
        res.send({code:1 , message:data});
    })
    .catch((error)=>{
        res.send({code:0,message:error})
    })
});

router.post('/update_answer' , (req,res)=>{
    var result = adminController.updateAnswer(req.body.id,req.body.value);
    result.then((data)=>{
        res.send({code:1 , message:  data});
    })
    .catch((error)=>{
        res.send({code:0,message:error});
    })
})


router.post('/update_option' , (req , res)=>{
    adminController.updateOption(req.body.id , req.body.value)
    .then((data)=>{
        res.send({code:1 , message: data});
    })
    .catch((error)=>{
        res.send({
            code: 0,
            message: error
        });
    })
});
router.post('/add_option' , (req,res)=>{
    adminController.addOption(req.body.optionName , req.body.forQuestion)
    .then((data)=>{
        res.send({
            code: 1,
            message: "option inserted successfully",
            meta: data
        });
    })
    .catch((error)=>{
        res.send({
            code: 0,
            message: error
        })
    });
});

router.post('/add_answer' , (req,res)=>{
    adminController.addAnswer(req.body.option , req.body.answerContent)
    .then((data)=>{
        res.send({
            code: 1,
            message: 'answer added successfully',
            answer_id: data
        });
    })
    .catch((error)=>{
        res.send({
            code: 0,
            message: error
        })
    });
});
router.post('/add_question' , (req,res)=>{
    adminController.addQuestion(req.body.option , req.body.question)
    .then((data)=>{
        res.send({
            code: 1,
            message: 'question added successfully',
            question_id:data
        });
    })
    .catch((error)=>{
        res.send({
            code: 0,
            message: error
        });
    });
});

router.post('/delete_answer' , (req,res)=>{
    adminController.deleteAnswer(req.body.id)
    .then(data=>{
        res.send({
            code: 1,
            message: 'answer removed successfully',
            meta:data[0]
        });
    })
    .catch((error)=>{
        res.send({
            code: 0,
            message: error
        });
    });
});

router.post('/delete_option' , (req,res)=>{
    adminController.deleteOption(req.body.id)
    .then(data=>{
        res.send({
            code: 1,
            message: 'option removed successfully'
        });
    })
    .catch((error)=>{
        res.send({
            code: 0,
            message: error
        });
    });
});

router.post('/delete_question' , (req,res)=>{
    adminController.deleteQuestion(req.body.id)
    .then(data=>{
        res.send({
            code: 1,
            message: 'question removed successfully'
        });
    })
    .catch((error)=>{
        res.send({
            status: 0,
            message: error
        });
    });
})
module.exports = router;