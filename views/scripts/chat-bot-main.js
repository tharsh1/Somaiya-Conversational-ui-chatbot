
var chatboxOpen = false;
function start_chat(){
    $.get('/chat/start',(data)=>{
        $('.chat-content').append("<div class ='message-received'>"+data+"</div>").hide().fadeIn(400);

    });
    $.post('/chat/get_options',{'next_options':'1'},(data)=>{
        for(option of data){
            $('.options').append("<button class = 'optionbtn' value = '"+option.next_question+"'>"+option.option_name+"</button>").hide().fadeIn(400);
        }
    });
}
$('#arrow').click(()=>{
    
    if(!chatboxOpen){
        $('.chatbot').animate({
            bottom: "0px"
        },{
            duration: 600,
            queue: false,
            complete:()=>{
                start_chat();
            }
        });
        chatboxOpen = true;
    }else{
        $('.chatbot').animate({
            bottom: "-420px"
        },{
            duration: 600,
            queue: false,
            
        });
        setTimeout(()=>{
            $('.chat-container').empty();
        },100);
        chatboxOpen = false;
    }
});            
            
$('.options').on('click','.optionbtn',function(){
    var newmsg = $("<div class ='message-sent'>"+$(this).text()+"</div>");
    newmsg.hide();
    $('.chat-content').append(newmsg);
    newmsg.fadeIn(400);
    var next_question = $(this).val();
    console.log(next_question);
    if(next_question != 'null' && next_question != -11){
        setTimeout(()=>{
            $.post('/chat/next_question',{'next_question':next_question},function(data){

                var msgrcd = $("<div class ='message-received'>"+data.question+"</div>");
                msgrcd.hide();
                $('.chat-content').append(msgrcd);
                msgrcd.fadeIn(400);
                $('.chat-content').animate({
                    scrollTop: $('.chat-content')[0].scrollHeight}, "slow");
                $('.optionbtn').fadeOut(400);
                $('options').empty();
                $.post('/chat/get_options',{'next_options':data.id},function(data){
                    for(option of data){
                        $('.options').append("<button class = 'optionbtn' value = '"+option.next_question+"'>"+option.option_name+"</button>").hide().fadeIn(400);
                    }
                }); 
            });
            },400);
    }else if(next_question == -11){
        var newmsg = $("<div class ='message-sent'>"+$(this).text()+"</div>");
        
    }else{
        console.log('hey');
        $.post('/chat/answer',{'option':$(this).text()}, function(data){
            var msgrcd = $("<div class ='message-received'>"+data+"</div>");
            msgrcd.hide();
            $('.chat-content').append(msgrcd);
            msgrcd.delay(400).fadeIn(400);
            $('.chat-content').animate({
                scrollTop: $('.chat-content')[0].scrollHeight}, "slow");
            $('.optionbtn').fadeOut(400);
            $('options').empty();
            setTimeout(()=>{
                $('.options').append("<button class = 'optionbtn' value = '1'>Start Over</button>").hide().fadeIn(400);
            },600);
            
        });
    }
});