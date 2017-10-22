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

var clicks = 0, first, second, timer, firstClass, secondClass, stars = 3, moves, wrongMove = 0, userAttempts = 0, movesMade, timeStarted = false;

$('.card').unbind('click').click(function(e){
    if(!timeStarted){
        timeStarted = true;
        startTimer();
    }
    userAttempts++;
    countMoves();
    if(clicks == 0){
        $(this).css('font-size','33px');
        $(this).css('background-color','#02b3e4');
        first = $(this);
        firstClass = first.children('i').attr('class');
        console.log("first: " + firstClass);
        clicks++;
        console.log(clicks);
        first.off();
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
        first.on();
        clicks--;
        console.log(clicks);
    }
    if ($(".deck").children().length == $(".deck").children(".match").length) {
        $('.modal-title').text("You Win! Keep Practicing!");
        $('.stats').text(`You got ${stars} star(s) with ${moves} moves, after ${current_time_played}`);
        $('#myModal').modal('show');
        restartGame();
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

function startTimer() {
    const game_start_time = new Date().getTime(); //get the current time when user clicked the first card
    const time_limit = new Date(game_start_time + 5 * 60000);
    let timer = setInterval(function () {

        const current_time = new Date().getTime();
        let current_time_played = current_time - game_start_time; //calculate time elapsed
        let time_left = time_limit - current_time_played; //calculate the time left in game completion
        let hrs = Math.floor((current_time_played % (1000 *60 * 60 * 24)) / (1000 * 60 *60));
        let mins = Math.floor((current_time_played % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((current_time_played % (1000 * 60)) / 1000);

        let left_hrs = Math.floor((time_left % (1000 *60 * 60 * 24)) / (1000 * 60 *60));
        let left_mins = Math.floor((time_left % (1000 * 60 * 60)) / (1000 * 60));
        let left_secs = Math.floor((time_left % (1000 * 60)) / 1000);

        let time_value = mins + ' mins' + secs + ' secs'; // this is to display in the stats modal

        if(left_secs === 0) {
            $('.modal-title').text('Game Over');
            $('.stats').text('You Loose! Try Harder');
            $('#myModal').modal('show');
            clearInterval(timer);
        }

        current_time_played = mins + ':' + secs;
        time_left = left_mins + ':' + left_secs;
        $(".time-played").text(current_time_played); 
        $('#time').text(time_left);   
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
