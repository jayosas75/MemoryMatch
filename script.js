$(document).ready(initialize_game);

function initialize_game() {
    reset_cards();
    randomize_cards();
    $('.youWin_img, #fumble, .message').hide();
    $('.card').click(card_clicked);
    $('.reset').click(function(){
        reset_stats();
        randomize_cards();
        reset_cards();
    });
}

/*Global Variables to keep track of the game*/
let accept_click = true;
let first_card_clicked = null;
let second_card_clicked = null;
let total_possible_matches = 9;
let match_counter = 0;
let attempts = 0;
let games_played = 0;
let sack_counter = 0;
let width_progress_bar = 11;

/*If no card has been clicked for a couple seconds this function will run each time a card is clicked, it will
also look to see if the 2 cards selected are matched*/
function card_clicked() {
    if (accept_click) {
        let back_element = $(this).find('.back');
        back_element.hide();
        if (first_card_clicked == null) {
            first_card_clicked = $(this);
            return;
        } else {
            second_card_clicked = $(this);
            attempts++;
            sack_counter++;
            double_click_sameCard_fix();
        }
        if (first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src')) {
            cards_matched();
            if (match_counter == total_possible_matches) {
                all_cards_matched();
            } else {
                return;
            }
        } else {
            accept_click = false;
            setTimeout(flip_back, 1200);
        }
    }
    display_stats();
}

/*If the two cards selected are not a matching combination they will flip back over and add a "sack" to sack display*/
function flip_back(){
    $(first_card_clicked).find('.back').show();
    $(second_card_clicked).find('.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
    accept_click = true;
    if(sack_counter === 5){
        $('#game-area').hide();
        $('#fumble, #loseMessage').show();
    }
}

/*If cards matched then both will disapear from game board and progress bar will update 10%*/
function cards_matched(){
    first_card_clicked.addClass('flipped');
    second_card_clicked.addClass('flipped');
    match_counter++;
    first_card_clicked = null;
    second_card_clicked = null;
    accept_click = true;
    sack_counter = 0;
    increment_progressbar();
    display_stats();
    width_progress_bar += 10;
}

/*Will run when all 9 pairs have been found and display win message*/
function all_cards_matched(){
    $('.card').hide();
    $('.card').find('.front').hide();
    $('.card').find('.back').hide();
    $('.youWin_img, #winMessage').show();
}

/*Fix if the same card has been clicked twice, would have registered as a match but now it will not.*/
function double_click_sameCard_fix() {
    if (first_card_clicked[0] == second_card_clicked[0]) {
        second_card_clicked = null;
    }
}

/*Displays stats onto stats container on the left side of the screen*/
function display_stats(){
    accuracy = (match_counter / attempts);
    accuracy = accuracy * 100;
    if (!accuracy) {accuracy = 0};
    accuracy_formatted = accuracy.toFixed() + '%';
    $('#games_played_value').text(games_played);
    $('#accuracy_value').text(accuracy_formatted);
    $('#attempts_value').text(attempts);
    $('#sacks_value').text(sack_counter);
}

/*Functions to reset stats and cards, changes DOM and resets globals*/
function reset_stats(){
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
    sack_counter = 0;
    width_progress_bar = 11;
    $('#progressBar').width('1%');
    display_stats();
}

function reset_cards(){
    $('.card').removeClass('flipped');
    $('.youWin_img, #fumble, .message').hide();
    $('#game-area').show();
    $('.card').show();
    $('.card').find('.back').show();
    $('.card').find('.front').show();
    randomize_cards();
    games_played++;
    first_card_clicked = null;
    second_card_clicked = null;
}

/*Function to randomize the cards that way each game is not the same*/
function randomize_cards() {
    let arr = Array.prototype.slice.call(document.getElementsByClassName("card"));
    while (arr.length > 0) {
        let random_number = Math.floor(Math.random() * arr.length);
        let random = arr.splice(random_number, 1);
        $("#game-area").append(random[0]);
    }
}

/*Increases progress bar at bottom of screen and gives it a animation*/
function increment_progressbar() {
    let percentage = width_progress_bar + '%';
    $(".meter > span").each(function() {
        $(this)
            .width(percentage)
            .animate({
                width: width_progress_bar + '%'
            }, 1200);
    });
}