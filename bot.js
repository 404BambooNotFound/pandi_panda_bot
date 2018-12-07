let moodList = {
    default: "default",
    angry: "angry"
};

class Bot {
    constructor() {
        this.mood = moodList.default;
        this.responsePool = responses;
        this.lastMessageDate = new Date().getTime();
        this.noMessageThreeshold = 1000 * 30; // 30 seconds

        this.prefixs = {
            "default": "[Pandi Panda]",
            "angry": "[Pandi Panda]"
        };

        // setup the thread to check whenever the user is away
        this.awake();
    }

    getPrefix() {
        return this.prefixs[this.mood] + " ";
    }

    awake() {
        this.lastMessageDate = new Date().getTime();
        setInterval(this.checkMessagesTime, 5000);
    }

    sleep() {
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
        this.mood = moodList.angry;

        let specialResponse = special_responces["waiting_too_much"];

        this.addDialog(specialResponse[Math.floor(Math.random() * specialResponse.length)], true);
    }

    onTextSubmitted() {
        let text_field = $("#main_text");

        let userSentence = text_field.val();

        if (userSentence.length === 0) {
            this.mood = moodList.angry;
            return;
        }

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

                if (nbContainedKeywords > bestResponse.keywordCount) {
                    bestResponse.keywordCount = nbContainedKeywords;
                    bestResponse.response = response;
                }
            }

            if (!bestResponse.response) {
                return this.manageNoMatching(userSentence);
            }

            // Check if there is a response for the current mood, else just send the default message
            let responseSet = bestResponse.response.responses[moodList.default];
            if (bestResponse.response.responses[this.mood]) {
                responseSet = bestResponse.response.responses[this.mood];
            }

            return responseSet[Math.floor(Math.random() * responseSet.length)];

        } catch (e) {
            return "Mes developpeurs ne sont pas fort, je suis planté ...";
        }
    }

    manageNoMatching(userSentence) {

        // remove unused words called stopwords
        let usefullWords = userSentence.split(" ").filter(function (w) {
            return !stopwords.includes(w);
        });

        // If the user just sent nothing important
        if (usefullWords.length === 0) {
            let rep = special_responces["no_response_match"];
            return rep[Math.floor(Math.random() * rep.length)];
        }

        // it's time to check if the user is dumb or not
        // lets make a Wikipedia research

        let search = usefullWords.join(" ");

        let wikiResponse = this.wikiSearch(search);

        if (wikiResponse.length === 0) {
            let rep = special_responces["no_wiki_response_match"];
            return rep[Math.floor(Math.random() * rep.length)];
        } else if (wikiResponse.length === 1) {
            let rep = special_responces["one_wiki_response_match"];
            let theone = wikiResponse[0];
            return rep[Math.floor(Math.random() * rep.length)].format(theone.title, theone.snippet);
        }

        let rep = special_responces["too_much_wiki_response_match"];
        return rep[Math.floor(Math.random() * rep.length)].format(wikiResponse.length);
    }

    wikiSearch(searchQuery) {

        let responseArray = [];

        $.ajax({
            url: 'https://fr.wikipedia.org/w/api.php',
            async: false,
            data: {
                action: 'query',
                list: "search",
                prop: 'info',
                inprop: 'url',
                utf8: '',
                format: 'json',
                srlimit: 30,
                srsearch: encodeURI(searchQuery),
                origin: '*'
            },
            success: function (data) {
                responseArray = data;
            }
        });

        return responseArray.query.search;
    }
}