let user_prefix = "[Super intelligent human]";
let bot = new Bot();


$(document).ready(function () {
    $('#main_text').keypress(function (e) {
        if (e.which === 13) {
            bot.onTextSubmitted();
        }
    });
});