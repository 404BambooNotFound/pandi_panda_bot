
let responses = [
    {
        "keyword": ["bonjour", "hello", "salut", "coucou", "yo", "wesh", "kikou", "allo", "guten tag", "konichiwa", "ohayo", "ohayou"],
        "responses": {
            "default": ["Salut, je suis là pour t'aider. Enfin je crois...", "Oui, bonjour."],
            "angry" : ["Ouais, salut. Qu'est-ce que tu veux ?", "Quoi encore ?" ],
            "happy" : ["Hello mon cher ! Que puis-je faire pour toi ?"]
        }
    },
    {
        "keyword": ["au revoir", "bye", "good bye"],
        "responses": {
            "default": ["Au revoir"],
            "angry": ["Bon vent"]
        }
    },
    {
        "keyword": [""],
        "responses": {
            "default": [""],
            "angry": [""]
        }
    }
];

let special_responces = {
    "waiting_too_much" : ["", ""]
};
