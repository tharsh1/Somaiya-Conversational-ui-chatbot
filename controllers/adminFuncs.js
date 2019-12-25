const connectionPool = require('../config/database-connection');
const get_question_query = 'select * from questions where id=?';
const get_options_query = 'select * from options where for_question=?';
const get_answer_query = 'select answers.id, answers.answer from answers join options where answers.optionid = options.id and options.option_name = ?';
const updateQuestionQuery = 'update questions set question = ? where id = ?';
const updateOptionQuery = 'update options set option_name = ? where id = ?';
const updateAnswerQuery = 'update answers set answer = ? where id = ?'
const addOptionQuery = 'insert into options(option_name,for_question,next_question) values(? , ? , ?)';
const addAnswerQuery = 'insert into answers(optionid , answer) values(? , ?)';
const addQuestionQuery = 'insert into questions(question) values (?)';
const delAnswerQueries = 'update options set next_question = ? where id = (select optionid from answers where id = ?); select id from options where id = (select optionid from answers where id = ?); delete from answers where id = ?; '

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
            conn.release();
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
            conn.release();
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
            conn.release();
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
            conn.release();
        });
    });
};

var addAnswer = (optionId , answer) => {
    return new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,conn)=>{
            if(err){
                reject('could not connect to the DB');
            }

            conn.query(addAnswerQuery , [optionId , answer] , function(err,results,fields){
                if(err){
                    reject('could not insert new answer');
                }
                conn.query('update options set next_question = NULL where id = ?' , optionId , function(err,res,fields){
                    if(err){
                        reject('could not complete the task successfully');
                    }
                });
                console.log(results);
                resolve({answer_id: results.insertId});
            });

            conn.release();
        });
    });
};

var addQuestion = (optionId , question)=>{
    return new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,conn)=>{
            if(err){
                reject('error in connecting to db')
            }
            conn.query(addQuestionQuery , question , (err,results,fields)=>{
                if(err){
                    reject('could not insert new question');
                }
                conn.query('update options set next_question = ? where id = ?' , [results.insertId , optionId] , (err,res,fields)=>{
                    if(err){
                        reject('could not complete your request');
                    }
                });
                console.log(results);
                resolve({question_id:results.insertId});
            });
        });
    });
};

var deleteAnswer = (id)=>{
    return new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,conn)=>{
            if(err){
                reject('error in conecting to DB');
            }
            conn.query(delAnswerQueries,[-1,id,id,id],(err,results,fields)=>{
                if(err){
                    reject('could not delete the answer');
                }
                console.log(results[1]);
                resolve(results[1]);
            });
            conn.release();
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
module.exports.addAnswer = addAnswer;
module.exports.addQuestion = addQuestion;
module.exports.deleteAnswer = deleteAnswer;