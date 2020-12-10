// prevent script from starting before the document is ready

$(document).ready(function(){
    // define starting lives

    let life = 5;

    // function to generate an integer between 0 and max-1

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // generate a number between 0 and 100

    const currentNumber = getRandomInt(101);

    // define function for narrator. just to add some sass to this game.

    function narrator(speech, subSpeech) {
        const narrator = $('.fields__conversation');
        const narratorSubtext = $('.fields__underbreath');
        narrator.replaceWith('<h2 class="h2 fields__heading fields__conversation">' + speech + '</h2>');
        narratorSubtext.replaceWith('<h4 class="h4 fields__subheading fields__underbreath">' + subSpeech + '</h4>');
    }

    // get button element and listen for click event. On click event we will check if letter exists in our current word. If not then lose life.

    const button = $('.fields__submit');
    const input = $('.fields__character-input');

    $(button).click(function() {
        const guess = parseInt(input.val());
        const garbageGuesses = [];
        let hasGuessed = false;
        let fullLife = $('.life--full')
        input.val('');

        // compare guess to current number.
        if (guess > currentNumber) {
            narrator('went a bit overboard, didn\'t we?', 'try smaller')
            if(life === 2) {
                narrator('too big. this is your last try', 'make it count')
            }
        } else if (guess < currentNumber) {
            narrator('too small, too small.. i can\'t even see this small', 'go big or go home')
            if(life === 2) {
                narrator('nope, too small. this is your last try', 'make it count')
            }
        } else if (guess === currentNumber) {
            narrator('damn, you got it right', 'best 2 out of 3? let\'s go');
            window.setTimeout(function(){
                window.clearTimeout();
                location.reload();
            },2500)
        }

        // the guessed number didnt equal our currentNumber, so we will lose a life.

        if (!hasGuessed){
            if(life > 1){
                life = life - 1;
                fullLife.first().removeClass('life--full');
                //display wasted guesses at the bottom of the page.
                garbageGuesses.push(guess);
                $('.fields__garbage').append(garbageGuesses, ', ');
            } else {
                fullLife.first().removeClass('life--full');
                //display wasted guesses at the bottom of the page.
                garbageGuesses.push(guess);
                $('.fields__garbage').append(garbageGuesses, '');
                //tell the player they lost
                narrator('i win,','but i\'m willing to give you another chance');
                window.setTimeout(function(){
                    //clear the timeout we set
                    window.clearTimeout()
                    //reload the window after alert has been closed.
                    location.reload();
                }, 2500)
            }
        }

    });
})
