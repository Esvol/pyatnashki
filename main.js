let checker = 0;
let minute = 1;
let seconds = 0; 
let Taimer;
let flagStart = true;
let flagNew = false;
let flagCheck = false;

$('.start').click(start);
$('.check').click(check);
$('.btn-danger').click(close);
$('.btn-success').click(checkResult);
$('.new').click(New);
$('.buttons-container div').click(colorChecker);


function start(){

    if (flagStart)
    {
        $('.numbers').sortable({
            connectWith: '#left, #right'
        })

        $('#right').css('background-color', 'azure');

        Taimer = setInterval(function(){
            if (seconds < 10)
            {
                seconds =  '0' + seconds;
            }
            
            if (minute != 0)
            {
                minute--;
                seconds = 59
            }

            $('.time').html(`0${minute}:${seconds}`);
            $('.time-left').html(`0${minute}:${seconds}`);

            if (seconds > 0)
            {
                seconds--;
            }
            else{
                clearInterval(Taimer);
                $('.screen').css('display', 'block');
                $('.wrong-answer').css('display', 'flex');
                $('.question').css('display', 'none');
                $('.right-answer').css('display', 'none');
                minute = 1;
                seconds = 0; 
            }

        }, 1000)

        flagStart = false;
        flagNew = true;
        flagCheck = true;
    }

}

function check(){
    if (flagCheck)
    {
        $('.screen').css('display', 'block');
        $('.question').css('display', 'flex');
        if(minute==1 && seconds == 0)
        {
            $('.time-left').html(`01:00`);  
        }
    }
}

function close(){
    $('.screen').css('display', 'none');
    $('.question').css('display', 'none');
    $('.wrong-answer').css('display', 'none');
    $('.right-answer').css('display', 'none');
}

function checkResult(){
    if (flagCheck)
    {
        for (let i=0; i<$('.number').length; i++)
        {
            if ($('#right div').eq(i).html() == i+1 && $('#right div').length == 9)
            {
                checker++;
            }
        }
        if (checker==9)
        {
            $('.right-answer').css('display', 'flex');
            checker = 0;
        }
        else{
            $('.wrong-answer').css('display', 'flex');
            checker = 0;
        }

        clearInterval(Taimer);
        $('.question').css('display', 'none');
        $('.numbers').sortable({
            connectWith: '#left'
        })
        $('#right').css('background-color', 'rgb(207, 207, 207)');

        flagCheck = false;
    }
}

function New(){
    if (flagNew)
    {
        clearInterval(Taimer);
        minute = 1;
        seconds = 0;
        $('.time').html(`01:00`);  

        $('.numbers').empty();

        for(let i=1; i<10; i++)
        {
            let rand = Math.random() - 0.5;
            if (rand>0)
            {
                $('#left').append(`<div class="number">${i}</div>`);
            }
            else
            {
                $('#left').prepend(`<div class="number">${i}</div>`);
            }
        }

        $('.numbers').sortable({
            connectWith: '#left'
        })
        $('#right').css('background-color', 'rgb(207, 207, 207)');
        $('.screen').css('display', 'none');   

        flagStart = true;
        flagNew = false;
        flagCheck = false;
    }
    
}

function colorChecker(){
    if (flagCheck)
    {
        $('.check').css('background-color', 'rgb(214, 69, 69)');
    }
    else{
        $('.check').css('background-color', 'rgb(214, 69, 69, 0.5)');
    }

    if (flagNew)
    {
        $('.new').css('background-color', 'rgb(214, 69, 69)');
    }
    else{
        $('.new').css('background-color', 'rgb(214, 69, 69, 0.5)');
    }

    if (flagStart)
    {
        $('.start').css('background-color', 'rgb(214, 69, 69)');
    }
    else{
        $('.start').css('background-color', 'rgb(214, 69, 69, 0.5)');
    }
}