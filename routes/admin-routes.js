//Importing 'express' module
var express = require('express');
//Creating router object
var router = express.Router();
//Importing 'path' module
const path = require('path');
//Importing 'body-parser' module
var bodyParser = require('body-parser');
//Importing 'adminFuncs' module
var adminController = require('../controllers/adminFuncs');
//Returns middleware that only parses json
router.use(bodyParser.json()); 
//Returns middleware that only parses urlencoded bodies
router.use(bodyParser.urlencoded({ extended: true }));


//For route '/admin/' open admin_dash.html file
router.get("/",(req,res)=>{
    res.sendFile(path.resolve(path.join(__dirname + '/../views/html/admin_dash.html')));
});

//For route '/admin/get_question_data' obtain next question and it;s associated options
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

//For route '/admin/get_answer' obtain answer for the given option
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

//For route '/admin/update_question' update the question having given id
router.post('/update_question' , (req,res)=>{
    var result = adminController.updateQuestion(req.body.id,req.body.value);
    result.then((data)=>{
        res.send({code:1 , message:data});
    })
    .catch((error)=>{
        res.send({code:0,message:error})
    })
});

//For route '/admin/update_answer' update the ansewer having given id
router.post('/update_answer' , (req,res)=>{
    var result = adminController.updateAnswer(req.body.id,req.body.value);
    result.then((data)=>{
        res.send({code:1 , message:  data});
    })
    .catch((error)=>{
        res.send({code:0,message:error});
    })
})

//For route '/admin/update_option' update the option having given id
router.post('/update_option' , (req , res)=>{
    adminController.updateOption(req.body.id , req.body.value)
    .then((data)=>{
        res.send({
            code:1, 
            message: 'Option is updated successfully'
        });
    })
    .catch((error)=>{
        res.send({
            code: 0,
            message: error
        });
    })
});

//For route '/admin/add_option' add the option for the given question with given name
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

//For route '/admin/add_answer' add the answer for the given option with given name
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

//For route '/admin/add_question' add the question with given qoptions
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

//For route '/admin/delete_answer' delete the answer with given id
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

//For route '/admin/delete_option' delete the option with given id
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

//For route '/admin/delete_question' delete the question with given id
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

//Export router to make it accessible in other files
module.exports = router;
