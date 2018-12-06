var bot_prefix = "[Pandi Panda]";
var user_prefix = "[Super intelligent human]";

$(document).ready(function () {
    $('#main_text').keypress(function (e) {
        if (e.which === 13) {
            onTextSubmited();
        }
    });
});

function onTextSubmited() {
    var text_field = $("#main_text");

    addDialog(text_field.val(), false);
    addDialog("response", true);
}

function addDialog(text, isBot) {

    var p = $("<p></p>");

    p.addClass("dialog");

    if (isBot) {
        p.append(bot_prefix);
        p.addClass("bot_dialog");
    } else {
        p.append(user_prefix);
        p.addClass("user_dialog");
    }

    p.append(" " + text);

    var dialog_histo = $("#dialog_historic");
    dialog_histo.append(p);
}