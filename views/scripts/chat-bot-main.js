
var textBoxDisplayed = false;
var chatboxOpen = false;
var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
        $('.chat-content').empty();
        $('.options').empty();
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
        console.log('not listed');
        var newmsg = $("<div class ='message-sent'>Type your query</div>");
        newmsg.hide();
        $('.chat-content').append(newmsg);
        newmsg.fadeIn(400);
        if(!textBoxDisplayed){
            var textBox = $("<input type = 'text' name = 'email' class = 'other email' placeholder='Enter your email' required/><input type = 'text' name = 'other' placeholder = 'enter your query' class = 'other text' required/><button class ='send '><i class = 'material-icons'>arrow_forward</i></button>");
            textBox.hide();
            $('.chat-content').append(textBox);
            textBox.delay(400).fadeIn(400);
            textBoxDisplayed = true;
        }
        $('.chat-content').animate({
            scrollTop: $('.chat-content')[0].scrollHeight}, "slow");
        $(this).prop('disabled',true);
        
    }else{
        // console.log('hey');
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

$('.chat-content').on('click','.send',function(){
    var text = $('.text').val();
    var email = $('.email').val();
    console.log(text);
    console.log(email);
    if(text == ''){
        alert('please type a question before sending.');
    }
    else if(email == '' || !email.match(email_regex)){
        alert('enter valid email');
    }
    else{
        // $.post('/chat/send_email',{'question' : text,'email': email} , function(data){
        //     console.log(data);
            console.log("email sent");
                var msgrcd = $("<div class ='message-received'>Your query has been recorded<br> We will reachout to you shortly.</div>");
                    msgrcd.hide();
                    textBoxDisplayed = false;
                    $('.chat-content').append(msgrcd);
                    msgrcd.fadeIn(400);
                    $('.chat-content').animate({
                        scrollTop: $('.chat-content')[0].scrollHeight}, "slow");
                $.post('/chat/next_question',{'next_question':1},function(data){
    
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
        // });
        

    }
});