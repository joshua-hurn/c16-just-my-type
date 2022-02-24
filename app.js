let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentenceCounter = 0;
let letterCounter = 0;
let yellowBlockPosition = 0;
let startTime;
let numberOfMistakes = 0;

sentences[sentenceCounter] // 'ten ate neite ate nee enet ite ate inet ent eate'
sentences[sentenceCounter][letterCounter] // 't'

$("#sentence").text(sentences[sentenceCounter]); // append first sentence onto page
$("#target-letter").text(sentences[sentenceCounter][letterCounter]); // append first character onto page
$("#keyboard-upper-container").hide(); // hide uppercase keyboard

$(document).one("keypress", function () {
    startTime = Date.now(); 
    console.log(startTime);
});

$(document).keydown(function (e) {
    // show uppercase board on shift press.
    if (e.key == "Shift") {
        $("#keyboard-lower-container").hide();
        $("#keyboard-upper-container").show();
    } else {
        $("#" + e.key.charCodeAt(0)).css("background-color", "yellow");

        yellowBlockPosition += 17.5
        $("#yellow-block").css("left", yellowBlockPosition);

        if (e.key == sentences[sentenceCounter][letterCounter]) {
            $("#feedback").append("<span class='glyphicon glyphicon-ok'></span>");
        } else {
            $("#feedback").append("<span class='glyphicon glyphicon-remove'></span>");
            numberOfMistakes++
        }

        letterCounter++;

        $("#target-letter").text(sentences[sentenceCounter][letterCounter]);

        // check if current sentence is complete
        if (letterCounter == sentences[sentenceCounter].length) {
            if (sentenceCounter == sentences.length - 1) {
                const endTime = Date.now();
                const minutesPlayed = (endTime - startTime) / 60000;
                const numberOfWords = sentences.join(" ").split(" ").length;
                const wpm = Math.round(numberOfWords / minutesPlayed - 2 * numberOfMistakes);
                let userChoice = confirm(wpm + " words per minute! Would you like to play again");
                if (userChoice) {
                    location.reload();
                }
            } else {
                sentenceCounter++;
                letterCounter = 0;
                yellowBlockPosition = 20;
                $("#yellow-block").css("left", yellowBlockPosition);
                $("#sentence").text(sentences[sentenceCounter]);
                $("#target-letter").text(sentences[sentenceCounter][letterCounter]);
                $("#feedback").empty();
            }
        }
    }
});

$(document).keyup(function (e) {
    if (e.key == "Shift") {
        $("#keyboard-upper-container").hide();
        $("#keyboard-lower-container").show();
    } else {
        $("#" + e.key.charCodeAt(0)).css("background-color", "#f5f5f5");
    }
});