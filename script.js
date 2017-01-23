$(document).ready(initialize_game);
function initialize_game() {
    randomize_cards();
    $('.youWin_img').hide();
    console.log('initialize_game called');
    $('.card').click(card_clicked);
    $('.reset').click(function(){
        reset_cards();
        reset_stats();
        randomize_cards();
    });

}
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var accept_click = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function card_clicked() {
    if (accept_click) {
        console.log('card_clicked called', this);
        var back_element = $(this).find('.back');
        back_element.hide();
        if (first_card_clicked == null) {
            first_card_clicked = $(this);
            return;
        } else {
            second_card_clicked = $(this);
            attempts++;
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
function flip_back(){
    $(first_card_clicked).find('.back').show();
    $(second_card_clicked).find('.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
    console.log('first and second card do not match');
    accept_click = true;

}
function cards_matched(){
    first_card_clicked.addClass('flipped');
    second_card_clicked.addClass('flipped');
    match_counter++;
    matches++;
    first_card_clicked = null;
    second_card_clicked = null;
    accept_click = true;
    display_stats();
}
function all_cards_matched(){
    console.log('You win');
    $('.card').hide();
    $('.card').find('.front').hide();
    $('.card').find('.back').hide();
    $('.youWin_img').show();
}
function double_click_sameCard_fix() {
    if (first_card_clicked[0] == second_card_clicked[0]) {
        second_card_clicked = null;
        return;
    }
}
function display_stats(){
    accuracy = (match_counter / attempts);
    accuracy = accuracy * 100;
    if (!accuracy) {accuracy = 0};
    accuracy_formatted = accuracy.toFixed() + '%';
    $('#games_played_value').text(games_played);
    $('#accuracy_value').text(accuracy_formatted);
    $('#attempts_value').text(attempts);
}
function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    match_counter = 0;
    display_stats();
}
function reset_cards(){
    $('.card').removeClass('flipped');
    $('.youWin_img').hide();
    $('.card').show();
    $('.card').find('.back').show();
    $('.card').find('.front').show();
    randomize_cards();
    games_played++;
    first_card_clicked = null;
    second_card_clicked = null;
}

function randomize_cards() {
    var arr = Array.prototype.slice.call(document.getElementsByClassName("card"));

    while (arr.length > 0) {
        var random_number = Math.floor(Math.random() * arr.length);
        var random = arr.splice(random_number, 1);
        $("#game-area").append(random[0]);
    }
}
