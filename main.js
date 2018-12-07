let user_prefix = "[Super intelligent human]";
let bot = new Bot();


$(document).ready(function () {
    $('#main_text').keypress(function (e) {
        if (e.which === 13) {
            onTextSubmitted();
        }
    });
});

function onTextSubmitted() {
    let text_field = $("#main_text");

    let userSentence = text_field.val();

    addDialog(userSentence, false);

    let response = bot.getResponse(userSentence);

    addDialog(response, true);
}

function addDialog(text, isBot) {

    let p = $("<p></p>");

    p.addClass("dialog");

    if (isBot) {
        p.append(bot.getPrefix());
        p.addClass("bot_dialog");
    } else {
        p.append(user_prefix);
        p.addClass("user_dialog");
    }

    p.append(" " + text);

    let dialog_histo = $("#dialog_historic");
    dialog_histo.append(p);
}