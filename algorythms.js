// prevent script from starting before the document is ready

$(document).ready(function(){
    // define function for narrator. just to add some sass to this game.

    function narrator(speech) {
        const narrator = $('.fields__conversation');
        const narratorSubtext = $('.fields__underbreath');
        if(speech) {
            narrator.replaceWith('<h2 class="h2 fields__heading fields__conversation">' + speech + '</h2>');
        }
    }

    // get button element and listen for click event. On click event we will check if letter exists in our current word. If not then lose life.

    const button = $('.fields__submit');
    const input = $('.fields__character-input');

    $(button).click(function() {
        const word = input.val().toLowerCase();
        const wordLength = word.length;
        input.val('');
        if(wordLength === 0) {
          narrator('you have to give me a word, dude.')
        } else if (wordLength < 6) {
            narrator('this is all? "' + word + '"? <br> is this really all you could come up with? <br> this is only '+wordLength+' letters! a donkey has better vocabulary')
        } else if ( (6 < wordLength) && (wordLength < 10) ) {
            narrator('uhuh, this is fine, i suppose. ' + word + ' is ' + wordLength + ' letters. <br> you can do better though, ')
        } else if ( wordLength > 10) {
            narrator('nice. some <i>real</i> words here. a whole '+wordLength+' letters. <br> well done, i suppose')
        }

    });
})
