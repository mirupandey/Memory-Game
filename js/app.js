/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//$(document).getElementByClassName("card").addEventListener("click", openCard);

var clicks = 0, first, second, timer, firstClass, secondClass, theTime, stars = 3, moves, wrongMove = 0, userAttempts = 0, movesMade, timeStarted = false;

$('.card').unbind('click').click(function(e){
    if(!timeStarted){
        timeStarted = true;
        startTimer(); // called when timeStarted value is false
    }
    countMoves();
    if(clicks == 0 && ($(this).is('[disabled=disabled]')) === false){
        $(this).css('font-size','33px');
        $(this).css('background-color','#02b3e4');
        first = $(this);
        first.attr('disabled','disabled');
        firstClass = first.children('i').attr('class');
        console.log("first: " + firstClass);
        clicks++;
        console.log(clicks);
        userAttempts++;
    }
    else if(($(this).is('[disabled=disabled]')) === false) {
        second = $(this);
        secondClass = second.children('i').attr('class');
        console.log("second: " + secondClass);
        $(this).css('font-size','33px');
        $(this).css('background-color','#02b3e4');

        if(secondClass == firstClass){
            setTimeout(function(){
                second.css('background-color','#02ccba');
                first.css('background-color','#02ccba');
                second.addClass('match');
                first.addClass('match');});
            $(this).attr('disabled','disabled');
            /*var list = document.getElementsByClassName("match").length;
            console.log(list.length);*/
            console.log(document.querySelectorAll('.match').length);
            if (document.querySelectorAll('.match').length === 14) {
                console.log("done");
                $('#t').html("00:05:00");
                $('.modal-body').text('You got ' + stars +' star(s) with ' + userAttempts + ' moves and still ' + theTime + ' time remaining.');
                $('.modal-title').text("You Win! Keep Practicing!");
                $('#myModal').modal('show');
                restartGame();
            }
        }
        else{
            first.removeAttr('disabled');
            setTimeout(function(){
                
                second.css('font-size','0px');
                second.css('background-color','#2e3d49');
                first.css('background-color','#2e3d49');
                first.css('font-size','0px');
                },1000);
            wrongMove++;
            if(wrongMove % 4 == 0) {
                rating();
            }
            if(stars == 0){
                $('.modal-title').text("You Loose!");
                $('#myModal').modal('show');
                $('#t').html("00:05:00");
                resetGame();
            }
        
        }
        
        clicks--;
        console.log(clicks);
    }
});


$('.reset').click(function(){
    resetGame();
});

function resetGame(){
    stars = 3;
    moves = document.getElementById('moves');
    userAttempts = 0;
    moves.textContent = userAttempts;
    var starCount = $('.stars').children('li').length;
    for(var i = starCount; i < 3; i++){
        $('.stars').append('<li><i class="fa fa-star"></i></li>');
    }
    $('.card').css('font-size', '0');
    $('.card').css('background-color','#2e3d49');
    clicks = 0;
    timeStarted = false;
    $('li[class^="cards"]').on();
}

function rating(){
    $('.stars').children('li').last().remove();
    stars--;
    console.log(moves.textContent);
}

function countMoves(){
    moves = document.getElementById('moves');
    moves.textContent = userAttempts;
}

function startTimer() { // startTimer function
    
        var timer = new Timer();
        timer.start({countdown: true, startValues: {minutes: 5}});
        $('#t').html(timer.getTimeValues().toString());
        timer.addEventListener('secondsUpdated', function (e) {
            $('#t').html(timer.getTimeValues().toString());
            theTime = timer.getTimeValues().toString();
        });
        timer.addEventListener('targetAchieved', function (e) {
            $('.modal-title').text("You Loose!");
            $('#myModal').modal('show');
            resetGame();
        });
        $('#continue').click(function() {
            timer.stop();
            $('#t').html("00:05:00");
            resetGame();
        });
        $('.reset').click(function() {
            timer.stop();
            $('#t').html("00:05:00");
            resetGame();
        });
}

window.onload = restartGame();

function restartGame() {
    resetGame();
};

var modal = document.getElementById('myModal');
var close = document.getElementsByClassName("close")[0];

close.onclick = function() {
    $('#myModal').modal('hide');
}
