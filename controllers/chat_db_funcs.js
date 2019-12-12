const connectionPool = require('../config/database-connection');
var start_conv_query = 'select question from questions where id = 1';
var get_options_query = 'select * from options where for_question=?';
var next_question_query = 'select * from questions where id = ?';
// var get_answer_query = 'select * from answers where optionid = (select id from options where option_name = ?)';
var get_answer_query = 'select answer from answers join options where answers.optionid = options.id and options.option_name = ?';

var start_conv = ()=>{
    return new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,conn) => {
            if(err){
                reject(err);
            }
            conn.query(start_conv_query,(err,results,fields) =>{
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
var next_question = (id)=>{
    return new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,conn) => {
            if(err){
                reject(err);
            }
            conn.query(next_question_query,id,(err,results,fields) =>{
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

module.exports.start_conv = start_conv;
module.exports.get_options = get_options;
module.exports.next_question = next_question;
module.exports.get_answer = get_answer;