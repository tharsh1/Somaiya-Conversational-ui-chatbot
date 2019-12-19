

$(document).ready(function(){
    $.post('/admin/get_question_data',{id:1}, function(data){
        // console.log(data);
        $('.question-container p').html(data.question.question);
        $('.question-container').data('question_id',data.question.id);
        data.options.forEach(option => {
            var optiondiv = $("<div class='option'>"+option.option_name+"</div>")
            optiondiv.data('meta-data',option);
            $('.option-container').append(optiondiv);
        });
    });

    setInterval(()=>{
        $('#content').animate({
            scrollTop: $('#content').scrollHeight}, "slow");
    },1000);
});

//replace the data if option of same question is clicked
//continue with path where the next_question is null and display the final answer for the route
$('body').on('click','.option',function(){
    
    $(this).siblings().removeClass('active');
    $(this).parent().nextAll().remove();
    var meta = $(this).data('meta-data');
    console.log(meta);
    var nextQuestion = meta.next_question;
    console.log(nextQuestion != null && nextQuestion != -11)
    if(nextQuestion != null && nextQuestion != -11){
        $(this).addClass('active');
        $.post('/admin/get_question_data',{id:nextQuestion}, function(data){
            var questionContainer = $("<div class='question-container'><p>"+data.question.question+"</p></div>");
            questionContainer.data('question_id',data.question.id)
            var optionContainer = $("<div class='option-container'></div>");
            data.options.forEach(option => {
                var optiondiv = $("<div class='option'>"+option.option_name+"</div>")
                optiondiv.data('meta-data',option);
                optionContainer.append(optiondiv);
            });
            $('#content').append(questionContainer);
            $('#content').append(optionContainer);
            
        });
    }
    else if(nextQuestion == null){
        $(this).addClass('active');
        $.post('/admin/get_answer',{option:meta.option_name},function(response){
            var answerContainer = $("<div class='answer-container'<p>"+response[0].answer+"</p></div>");
            answerContainer.data('answer_id',response[0].id);
            $('#content').append(answerContainer);
        });
    }
    
});


$('body').on('click','.question-container',function(){
    console.log($(this).data('question_id'));
});

