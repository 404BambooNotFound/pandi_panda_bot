class Bot {

    constructor() {
        this.feeling = "";
        this.responsePool = "";
    }

    getPrefix() {

    }

    getResponse(userSentence) {
        try {
            return "";
        }catch (e) {
            return "";
      }    }

    wikiSearch(searchQuery) {
  	  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    	fetch(endpoint)
    		.then(response => response.json())
    		.then(data => {
    	  	const results = data.query.search;
          displayResults(results);
  		})
      .catch(() => console.log('An error occurred'));
  }
}
