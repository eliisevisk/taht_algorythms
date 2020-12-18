// prevent script from starting before the document is ready

$(document).ready(function(){
    // define starting lives

    let life = 10;

    // define the element holding our results (the word we're looking for and the blanks replacing unrevealed words)

    const results = $('.fields__results');

    // function to generate an integer between 0 and max-1

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // get current word from our array of 5 words (which is why max = 5 in this fnc).

    const currentWord = words[getRandomInt(10001)];

    // for each letter in the word, we create a blank
    console.log(currentWord);

    for (let i = 0; i < currentWord.length; i++) {
        results.append('<span class="fields__results-letter" id="results-letter-' + i + '">_</span>')
    }

    // get button element and listen for click event. On click event we will check if letter exists in our current word. If not then lose life.

    const button = $('.fields__submit');
    const input = $('.fields__letter-input');

    $(button).click();

    $(button).click(function() {
        const guessLetter = input.val().toLowerCase();
        const wordLength = currentWord.length;
        const garbageLetters = [];
        let hasLetter = false;
        let fullLife = $('.life--full')
        input.val('');

        // loop through letters of the word to find all matching letters
        for (let i = 0; i < wordLength; i++) {
            if (currentWord[i] === guessLetter) {
                hasLetter = true;
                $('#results-letter-' + i).text(function (index, text) {
                    return text.replace('_', guessLetter)
                });
            }
        }

        // we didnt find the corresponding letter from our word, so we will lose a life.

        if (!hasLetter){
            if(life > 1){
                life = life - 1;
                fullLife.first().removeClass('life--full');
                //display wasted letters at the bottom of the page.
                garbageLetters.push(guessLetter);
                $('.fields__garbage').append(garbageLetters);
            } else {
                fullLife.first().removeClass('life--full');
                //display wasted letters at the bottom of the page.
                garbageLetters.push(guessLetter);
                $('.fields__garbage').append(garbageLetters);
                window.setTimeout(function(){
                    //clear the timeout we set
                    window.clearTimeout()
                    //alet the player of loss
                    alert('no win this time');
                    //reload the window after alert has been closed.
                    location.reload();
                }, 500)
            }
        }

        //display victory alert if player has guessed the word.

        const guessedLetters = $('.fields__results-letter');

        if(guessedLetters.text() === currentWord) {
            window.setTimeout(function(){
                window.clearTimeout();
                alert('you did it, lets play again')
                location.reload();
            }, 800)
        }

    });
})
