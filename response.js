
let responses = [
    {
        "keyword": ["bonjour", "hello", "salut", "coucou", "yo", "wesh", "kikou", "allo", "guten tag", "konichiwa", "ohayo", "ohayou"],
        "responses": {
            "default": ["Salut, je suis là pour t'aider. Enfin je crois..."],
            "angry" : ["Ouais, salut. Qu'est-ce que tu veux ?" ],
            "happy" : ["Hello mon cher ! Que puis-je faire pour toi ?"]
        }
    },
    {
        "keyword": ["au revoir", "bitre"],
        "responses": {
            "default": ["deded"],
            "angry": ["dede"],
            "happy": ["deded"]
        }
    },
    {
        "keyword": undefined,
        "responses": {
            "default": ["ffefef"],
            "angry": ["efefefe"],
            "happy": ["efefefefe"]
        }
    }
];

let special_responces = {
    "waiting_too_much" : ["", ""]
};
