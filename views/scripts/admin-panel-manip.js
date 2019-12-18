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
    var nextQuestion = $(this).data('meta-data').next_question;
    console.log(nextQuestion)
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
});


$('body').on('click','.question-container',function(){
    console.log($(this).data('question_id'));
});

