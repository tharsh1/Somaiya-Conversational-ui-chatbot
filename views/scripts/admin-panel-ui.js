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

$('body').on('contextmenu','.option',function(e){
    e.preventDefault();
    $('#option-menu').css({
        top: e.pageY + "px",
        left: e.pageX + "px"
    }).fadeIn(300);
    currOption =$(this); 
});
$(document).bind("mousedown", function (e) {
        if($(e.target).parents("#option-menu").length==0)
            $("#option-menu").fadeOut(200);
    
});
$('.menu ul li').click(function(){
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
        $('#edit-option-popup').fadeIn(200);
        popupActive = true;
    }
    else{
        alert('please perform a task on the active popup')
    }
});

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

