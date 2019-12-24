const connectionPool = require('../config/database-connection');
const get_question_query = 'select * from questions where id=?';
const get_options_query = 'select * from options where for_question=?';
const get_answer_query = 'select answers.id, answers.answer from answers join options where answers.optionid = options.id and options.option_name = ?';
const updateQuestionQuery = 'update questions set question = ? where id = ?';
const updateOptionQuery = 'update options set option_name = ? where id = ?';
const updateAnswerQuery = 'update answers set answer = ? where id = ?'
const addOptionQuery = 'insert into options(option_name,for_question,next_question) values(? , ? , ?)';

var get_question = (id)=>{
    return new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,conn) => {
            if(err){
                reject(err);
            }
            conn.query(get_question_query,id,(err,results,fields) =>{
                if(err){
                   reject(err);
                }
                resolve(results);
            });
            
            conn.release();        
        });
    });
};

var get_options = (id)=>{
    return new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,conn) => {
            if(err){
                reject(err);
            }
            conn.query(get_options_query,id,(err,results,fields) =>{
                if(err){
                   reject(err);
                }
                resolve(results);
            });
            
            conn.release();        
        });
    });
};

var get_answer = (option)=>{
    console.log(option);
    return new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,conn) => {
            if(err){
                reject(err);
            }
            conn.query(get_answer_query,option,(err,results,fields) =>{
                if(err){
                   reject(err);
                }
                resolve(results);
            });
            
            conn.release();        
        });
    });
}

var updateQuestion = (id,value)=>{
    return new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,conn)=>{
            if(err){
                reject('error in conecting to DB');
            }
            conn.query(updateQuestionQuery,[value,id],(err,results,fields)=>{
                if(err){
                    reject('could not update the question');
                }
                resolve(results);
            });
        });
    });
};

var updateAnswer = (id,value)=>{
    return new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,conn)=>{
            if(err){
                reject('error in conecting to DB');
            }
            conn.query(updateAnswerQuery,[value,id],(err,results,fields)=>{
                if(err){
                    reject('could not update the answer');
                }
                resolve(results);
            });
        });
    });
};

var updateOption = (id,value)=>{
    return new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,conn)=>{
            if(err){
                reject('error in connecting to DB');
            }
            conn.query(updateOptionQuery , [value,id],(err,results,fields)=>{
                if(err){
                    reject('could not update the option');
                }
                resolve();
            });
        });
    });
}

var addOption = (optionName , forQuestion) => {
    return new Promise((resolve , reject)=>{
        connectionPool.getConnection((err,conn)=>{
            if(err){
                reject('Error in connecting to DB');
            }
            conn.query(addOptionQuery , [optionName , forQuestion , -1] , (err,results,fields)=>{
                if(err){
                    reject('could not insert the option');
                }
                conn.query('select * from options where id = ?' ,results.insertId , (err,res,fields)=>{
                    if(err){
                        reject('could not make the view consistent');
                    }
                    resolve(res[0]);
                });
            });
        });
    });
};



module.exports.get_question = get_question;
module.exports.get_options = get_options;
module.exports.get_answer = get_answer;
module.exports.updateQuestion = updateQuestion;
module.exports.updateOption = updateOption;
module.exports.updateAnswer = updateAnswer;
module.exports.addOption = addOption;