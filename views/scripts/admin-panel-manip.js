$(document).ready(function(){
    $.post('/admin/get_question_data',{id:1}, function(data){
        // console.log(data);
        $('.question-container p').html(data.question);
        $('.question-container').data('question_id',data.id);
    });
});