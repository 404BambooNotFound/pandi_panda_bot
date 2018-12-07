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
        this.open();
    }

    getPrefix() {
        return this.prefixs[this.mood] + " ";
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

                if (nbContainedKeywords > bestResponse.keywordCount || (!keywords && bestResponse.keywordCount === 0)) {
                    bestResponse.keywordCount = nbContainedKeywords;
                    bestResponse.response = response;
                }
            }

            let responseSet = bestResponse.response.responses[feelings.default];
            if (bestResponse.response.responses[this.mood]) {
                responseSet = bestResponse.response.responses[this.mood];
            }

            return responseSet[Math.floor(Math.random() * responseSet.length)];

        } catch (e) {
            return "Mes developpeurs ne sont pas fort, je suis planté ...";
        }
    }

    wikiSearch(searchQuery) {
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${encodeURI(searchQuery)}`;
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                const results = data.query.search;
                displayResults(results);
            })
            .catch((e) => console.log(e));
    }

    displayResults(results) {
        // TODO Build response and add it to the list to permit


        // Store a reference to `.searchResults`
        const searchResults = document.querySelector('.searchResults');
        // Remove all child elements
        searchResults.innerHTML = '';
        // Loop over results array
        results.forEach(result => {
            const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

            searchResults.insertAdjacentHTML('beforeend',
                `<div class="resultItem">
        <h3 class="resultItem-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <span class="resultItem-snippet">${result.snippet}</span><br>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
      </div>`
            );
        });
    }
}
