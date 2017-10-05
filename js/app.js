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

var clicks = 0, first, second, firstClass, secondClass, stars = 3, moves, timerInitiate = 0, timeOut, wrongMove = 0, userAttempts = 0;

$('.card').unbind('click').click(function(e){
    userAttempts++;
    countMoves();
    if(clicks == 0){
        $(this).css('font-size','33px');
        $(this).css('background-color','#02b3e4');
        first = $(this);
        firstClass = first.children('i').attr('class');
        console.log("first: " + firstClass);
        timerInitiate++;
        clicks++;
        if(timerInitiate == 1){
            timeOut= setTimeout(function(){ alert("Game Over"); resetGame(); }, 120000);
            setInterval(function() {
                console.log('Time left: '+getTimeLeft(timeOut)+'s');
            }, 2000);

            function getTimeLeft(timeout) {
                return Math.ceil((timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000);
            }
        }
        console.log(clicks);
    }
    else{
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
                first.addClass('match');},1000);
            $(this).off();
            first.off();
        }
        else{
            setTimeout(function(){
                second.addClass('unmatch');
                first.addClass('unmatch');
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
                window.alert("Game Over");
                resetGame();
            }
        }
        clicks--;
        console.log(clicks);
    }
    if ($(".deck").children().length == $(".deck").children(".match").length) {
        clearTimeout(timeOut);
        setTimeout(function(){alert("Game Won");},1000);
    }
});


$('.restart').click(function(){
    resetGame();
});

function resetGame(){
    stars = 3;
    moves = document.getElementById('moves');
    moves.textContent = 0;
    var starCount = $('.stars').children('li').length;
    for(var i = starCount; i < 3; i++){
        $('.stars').append('<li><i class="fa fa-star"></i></li>');
    }
    $('.card').css('font-size', '0');
    $('.card').css('background-color','#2e3d49');
    clicks = 0;
    clearTimeout(timeOut);
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