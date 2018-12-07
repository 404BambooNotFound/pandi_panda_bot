let feelingsList = {
    default: "default",
    angry: "angry",
    happy: "happy",
    sad: "sad" // TODO ADD if wanted
};


class Bot {
    constructor() {
        this.feelings = feelingsList.default;
        this.responsePool = responses;
        this.lastMessageDate = new Date().getTime();
        this.noMessageThreeshold = 1000 * 30; // 30 seconds

        this.prefixs = {
            fee : "{Pandi Panda}",

        };

        // setup the thread to check whenever the user is away
        open();
    }

    getPrefix() {
        return this.prefixs[this.feelings];
    }

    open() {
        this.lastMessageDate = new Date().getTime();
        setInterval(this.checkMessagesTime, 5000);
    }

    stop() {
        clearInterval();
    }

    checkMessagesTime() {

        let currentDate = new Date().getTime();

        if (currentDate - this.lastMessageDate > this.noMessageThreeshold) {
            this.lastMessageDate = currentDate;
            this.sendWaitingMessage();
        }
    }

    sendWaitingMessage() {
        let specialResponse = special_responces["waiting_too_much"];

        this.addDialog(specialResponse[Math.floor(Math.random() * specialResponse.length)]);
    }

    onTextSubmitted() {
        let text_field = $("#main_text");

        let userSentence = text_field.val();

        this.addDialog(userSentence, false);

        let response = bot.getResponse(userSentence);

        this.addDialog(response, true);
    }

    addDialog(text, isBot) {

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

    getResponse(userSentence) {

        userSentence = userSentence.toLowerCase();

        try {

            let bestResponse = {response: undefined, keywordCount: 0};
            // Check all the possible responses
            for (let response of this.responsePool) {

                let keywords = response.keyword;
                let nbContainedKeywords = 0;

                if (keywords) {
                    for (let keyword of keywords) {
                        if (userSentence.includes(keyword.toLowerCase()))
                            nbContainedKeywords++;
                    }
                }

                if (nbContainedKeywords > bestResponse.keywordCount || (!keywords && bestResponse.keywordCount === 0)) {
                    bestResponse.keywordCount = nbContainedKeywords;
                    bestResponse.response = response;
                }
            }


            let responseSet = bestResponse.response.responses[feelings.default];
            if (bestResponse.response.responses[this.feelings]) {
                responseSet = bestResponse.response.responses[this.feelings];
            }

            return responseSet[Math.floor(Math.random() * responseSet.length)];

        } catch (e) {
            return "Mes developpeurs ne sont pas fort, je suis planté ...";
        }
    }
}