var popupActive = false;

$(document).contextmenu(function(e){
    e.preventDefault();
})
$('body').on('contextmenu','.question-container',function(e){
    e.preventDefault();
    $('#question-menu').css({
        top: e.pageY + "px",
        left: e.pageX + "px"
    }).fadeIn(300);
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
});
$(document).bind("mousedown", function (e) {
        if($(e.target).parents("#option-menu").length==0)
            $("#option-menu").fadeOut(200);
    
});
$('.menu ul li').click(function(){
    // console.log($(this).parent().parent());
    action = $(this).text();
    console.log(action)
    $(this).parent().parent().fadeOut(200);
    if(action == 'Delete Question' && !popupActive){
        $('#delete-question-popup').fadeIn(200);
        //code for deletion of question and underlying subtree
        popupActive = true;
    }
    else if(action == 'Delete option' && !popupActive){
        $('#delete-option-popup').fadeIn(200);
        //code for deletion of option and underlying subtree
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

