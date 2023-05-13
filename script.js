var word, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {
    var randomItem = words[Math.floor(Math.random() * words.length)];
    word = randomItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    $('.hints').text(randomItem.hint);
    $('.guesses').text(maxGuesses);
    $('.wrongs').text(incorrectLetters);

    var html = "";
    for (var i = 0; i < word.length; i++) {
        html += '<input class="bg-light m-1 text-center border rounded border-warning text-uppercase text-success fw-bold" id="'+i+'" style="width: 45px; height: 45px;" type="text" disabled>';
        $('.inputs').html(html);
    }
}
randomWord();

function initGame(e) {
    var key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (var i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    $('#'+i).val(key);
                }
            }
        } else {
            maxGuesses--;
            if (maxGuesses <= 3) {
                $('.guesses').removeClass('text-success'); $('.guesses').addClass('text-warning');
            }
            incorrectLetters.push(` ${key}`);
        }
        $('.guesses').text(maxGuesses);
        $('.wrongs').text(incorrectLetters);
    }
    $(".typing").val("");

    setTimeout(() => {
        if(correctLetters.length === word.length) {
            Swal.fire({heightAuto: false, html: 'Congrats! You found the word <strong>'+word.toUpperCase()+'</strong>', icon: 'success'});
            return randomWord();
        } else if(maxGuesses < 1) {
            Swal.fire({heightAuto: false, html: 'Game Over! Reset Game to play again', icon: 'error'});
            for(var i = 0; i < word.length; i++) {
                $('#'+i).val(word[i]);
            }
        }
    }, 100);
}

$('.btn').on("click", function() { randomWord(); $('.guesses').removeClass('text-warning'); $('.guesses').addClass('text-success'); });
$(".typing").on("input", initGame);
$(".inputs").on("click", () => $(".typing").focus());
$(document).on("keydown", () => $(".typing").focus());