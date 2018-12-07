let feelings = {
    default:"default",
    angry: "angry",
    happy:"happy",
    sad:"sad" // TODO ADD if wanted
};

class Bot {
    constructor() {
        this.feelings = feelings.default;
        this.responsePool = responses;
    }

    getPrefix() {
        return "[panda] ";
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
            if(bestResponse.response.responses[this.feelings]) {
                responseSet = bestResponse.response.responses[this.feelings];
            }

            return responseSet[Math.floor(Math.random() * responseSet.length)];

        } catch (e) {
            return "Mes developpeurs ne sont pas fort, je suis planté ...";
        }
    }
}