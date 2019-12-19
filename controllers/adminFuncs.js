const connectionPool = require('../config/database-connection');
var get_question_query = 'select * from questions where id=?';
var get_options_query = 'select * from options where for_question=?';
var get_answer_query = 'select answers.id, answers.answer from answers join options where answers.optionid = options.id and options.option_name = ?';
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





module.exports.get_question = get_question;
module.exports.get_options = get_options;
module.exports.get_answer = get_answer