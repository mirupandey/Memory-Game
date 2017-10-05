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

var clicks = 0, first, second, firstClass, secondClass, stars = 3, moves;

$('.card').click(function(e){
    if(clicks == 0){
        $(this).css('font-size','33px');
        $(this).css('background-color','#02b3e4');
        first = $(this);
        firstClass = first.children('i').attr('class');
        console.log("first: " + firstClass);
        clicks++;
        console.log(clicks);
    }
    else{
        second = $(this);
        secondClass = second.children('i').attr('class');
        console.log("second: " + secondClass);
        $(this).css('font-size','33px');
        $(this).css('background-color','#02b3e4');
        if(secondClass == firstClass){
            $(this).css('background-color','#02ccba');
            first.css('background-color','#02ccba');
            $(this).addClass('match');
            first.addClass('match');
        }
        else{
            $(this).addClass('unmatch');
            first.addClass('unmatch');
            $(this).css('background-color','#2e3d49');
            first.css('background-color','#2e3d49');
            $(this).css('font-size','0px');
            first.css('font-size','0px');
            $('.stars').children('li').last().remove();
            stars--;
            moves = document.getElementById('moves');
            moves.textContent = stars;
            console.log(moves.textContent);
            if(stars == 0){
                window.alert("Game Over");
                stars = 3;
                moves = document.getElementById('moves');
                moves.textContent = stars;
                var starCount = $('.stars').children('li').length;
                for(var i = starCount; i < 3; i++){
                    $('.stars').append('<li><i class="fa fa-star"></i></li>');
                }
                $('.card').css('font-size', '0');
                $('.card').css('background-color','#2e3d49');
                clicks = 0;
            }
        }
        clicks--;
        console.log(clicks);
    }
});

$('.restart').click(function(){
    stars = 3;
    moves = document.getElementById('moves');
    moves.textContent = stars;
    var starCount = $('.stars').children('li').length;
    for(var i = starCount; i < 3; i++){
        $('.stars').append('<li><i class="fa fa-star"></i></li>');
    }
    $('.card').css('font-size', '0');
    $('.card').css('background-color','#2e3d49');
    clicks = 0;
});

