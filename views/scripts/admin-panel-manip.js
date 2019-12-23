$(document).ready(function(){
    $.post('/admin/get_question_data',{id:1}, function(data){
        // console.log(data);
        $('.question-container p').html(data.question.question);
        $('.question-container').data('question_id',data.question.id);
        
        if(data.options.length > 4){
            $('.option-container').css({justifyContent:'flex-start'});
        }
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


$('body').on('click','.option',function(){
    
    $(this).siblings().removeClass('active');
    $(this).parent().nextAll().remove();
    var meta = $(this).data('meta-data');
    // console.log(meta);
    var nextQuestion = meta.next_question;
    // console.log(nextQuestion != null && nextQuestion != -11)
    if(nextQuestion != null && nextQuestion != -11 && nextQuestion != -1){
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
        $(this).data('hasAnswer',true);
        $.post('/admin/get_answer',{option:meta.option_name},function(response){
            console.log(response);
            if(response.length != 0){
                var answerContainer = $("<div class='answer-container'<p>"+response[0].answer+"</p></div>");
                answerContainer.data('answer_id',response[0].id);
                $('#content').append(answerContainer);
            }
            
        });
    }
    else{
        if(nextQuestion != -11)
            $('#content').append("<p class = 'incomplete'>This route is incomplete</p>");
    }
    
});

