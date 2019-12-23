var popupActive = false;
var textboxEmpty= false;
var currQuestion = null;
var currOption = null;
$(document).contextmenu(function(e){
    e.preventDefault();
});

$('body').on('contextmenu','.question-container',function(e){
    e.preventDefault();
    $('#question-menu').css({
        top: e.pageY + "px",
        left: e.pageX + "px"
    }).fadeIn(300);
    currQuestion = $(this);
});
$(document).bind("mousedown", function (e) {
        if($(e.target).parents("#question-menu").length==0)
            $("#question-menu").fadeOut(200);
    
});

$('body').on('contextmenu','.answer-container',function(e){
    e.preventDefault();
    $('#answer-menu').css({
        top: e.pageY + "px",
        left: e.pageX + "px"
    }).fadeIn(300);
    currQuestion = $(this);
});

$(document).bind("mousedown", function (e) {
        if($(e.target).parents("#answer-menu").length==0)
            $("#answer-menu").fadeOut(200);
    
});

$('body').on('contextmenu','.option',function(e){
    e.preventDefault();
    const meta = $(this).data('meta-data');
    console.log(meta);
    if(meta.next_question != -11 ){
        if($(this).data('hasAnswer') || meta.next_question != -1){
            $('#option-menu ul li').eq(3).addClass('menu-item--disabled')
            $('#option-menu ul li').eq(2).addClass('menu-item--disabled')

        }
        else{
            $('#option-menu ul li').eq(2).removeClass('menu-item--disabled')
            $('#option-menu ul li').eq(3).removeClass('menu-item--disabled')

        }
    

        // if(){

        //     $('#option-menu ul li').eq(2).addClass('menu-item--disabled')
        // }
        // else{
        //     $('#option-menu ul li').eq(2).removeClass('menu-item--disabled')
        // }
        
        $('#option-menu').css({
            top: e.pageY + "px",
            left: e.pageX + "px"
        }).fadeIn(300);
        // $('#option-menu ul li').eq(2).addClass('menu-item--disabled')
        currOption =$(this); 
    }else{
        alert('This is the default option. Please do not alter this');
    }
});
$(document).bind("mousedown", function (e) {
        if($(e.target).parents("#option-menu").length==0)
            $("#option-menu").fadeOut(200);
    
});
$('.menu ul li').click(function(e){
    // console.log($(this).parent().parent());
    action = $(this).text();
    // console.log(action)
    $(this).parent().parent().fadeOut(200);
    if(action == 'Delete Question' && !popupActive){
        $('#delete-question-popup').fadeIn(200);
        popupActive = true;
    }
    else if(action == 'Delete option' && !popupActive){
        $('#delete-option-popup').fadeIn(200);
        popupActive = true;
    }
    else if(action == 'Edit Question' && !popupActive){
        console.log()
        $('#edit-question-popup textarea').val(currQuestion.children('p').html().replace('<br>',"\n"))
        $('#edit-question-popup').fadeIn(200);
        popupActive = true;
    }
    else if(action == 'Add Question' && !popupActive){
        $('#add-question-popup').fadeIn(200);
        popupActive = true;
    }
    else if(action == 'Add Answer' && !popupActive){
        $('#add-answer-popup').fadeIn(200);
        popupActive = true;
    }
    else if(action == 'Add option' && !popupActive){
        $('#add-option-popup').fadeIn(200);
        popupActive = true;
    }
    else if(action == 'Edit option' && !popupActive){
        $('#edit-option-popup input').val(currOption.text())
        $('#edit-option-popup').fadeIn(200);
        popupActive = true;
    }
    else if(action == 'Edit Answer' && !popupActive){
        $('#edit-answer-popup').fadeIn(200);
        popupActive = true;
    }
    else if(action == 'Delete Answer' && !popupActive){
        $('#delete-answer-popup').fadeIn(200);
        popupActive = true;
    }
    else{
        alert('please perform a task on the active popup')
    }
});

$('.menu-item--disabled').click(function(e){
    console.log(this);
    e.preventDefault();
})
$('.popup img').click(function(){
    $(this).parent().fadeOut(200);
    popupActive = false;
});
$('.no').click(function(){
    $(this).parent().fadeOut(200);
    popupActive = false;
})

$('.textbox').blur(function(){
    if($(this).val() == '' && !textboxEmpty){
        $(this).next('p').text('*this field is required')
        textboxEmpty = true;
    }
    else{
        if($(this).val()!=""){
            $(this).next('p').text('');
            textboxEmpty = false;
        }
    }
});

$('#edit-question-popup .yes').click(function(){
    var newQuestion = $(this).parent().children('textarea').val().replace('\n','<br/>');
    currQuestion.children('p').html(newQuestion);
    $(this).parent().fadeOut(200);
    popupActive = false;
    const questionId = currQuestion.data().question_id;
    $.post('/admin/update_question',{id:questionId,value:newQuestion},function(response){
        console.log(response);
    });
});

$('#edit-option-popup .yes').click(function(){
    const newOption = $(this).siblings('input').val();
    $(this).parent().fadeOut(200);
    currOption.html(newOption);
    popupActive = false;
    const optionId = currOption.data().metaData.id;
    $.post('/admin/update_option' , {id:optionId,value:newOption} , function(response){
        console.log(response);
    });
});

