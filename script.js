$(document).ready(initialize_game);
function initialize_game() {
    randomize_cards();
    $('.youWin_img').hide();
    $('#fumble').hide();
    console.log('initialize_game called');
    $('.card').click(card_clicked);
    $('.reset').click(function(){
        reset_cards();
        reset_stats();
        randomize_cards();
    });
}
let accept_click = true;
let first_card_clicked = null;
let second_card_clicked = null;
let total_possible_matches = 9;
let match_counter = 0;
let attempts = 0;
let games_played = 0;
let sack_counter = 0;

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
function flip_back(){
    $(first_card_clicked).find('.back').show();
    $(second_card_clicked).find('.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
    console.log('first and second card do not match');
    accept_click = true;
    if(sack_counter === 5){
        $('#game-area').hide();
        $('#fumble').show();
    }

}
function cards_matched(){
    first_card_clicked.addClass('flipped');
    second_card_clicked.addClass('flipped');
    match_counter++;
    first_card_clicked = null;
    second_card_clicked = null;
    accept_click = true;
    display_stats();
}
function all_cards_matched(){
    console.log('You win');
    games_played++;
    $('.card').hide();
    $('.card').find('.front').hide();
    $('.card').find('.back').hide();
    $('.youWin_img').show();
}
function double_click_sameCard_fix() {
    if (first_card_clicked[0] == second_card_clicked[0]) {
        second_card_clicked = null;
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
    $('#sacks_value').text(sack_counter);
}
function reset_stats(){
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
    sack_counter = 0;
    display_stats();
}
function reset_cards(){
    debugger;
    $('.card').removeClass('flipped');
    $('.youWin_img, #fumble').hide();
    $('#game-area').show();
    $('.card').show();
    $('.card').find('.back').show();
    $('.card').find('.front').show();
    randomize_cards();
    games_played++;
    first_card_clicked = null;
    second_card_clicked = null;
}

function randomize_cards() {
    let arr = Array.prototype.slice.call(document.getElementsByClassName("card"));

    while (arr.length > 0) {
        let random_number = Math.floor(Math.random() * arr.length);
        let random = arr.splice(random_number, 1);
        $("#game-area").append(random[0]);
    }
}
