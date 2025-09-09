const chatBody      = document.getElementById('chat-body');
const chatInputText = document.getElementById('chat-text-input');
const chatInputSend = document.getElementById('chat-send-input');
const chatUserInput = document.getElementById("chat-user-input");

const SYSTEM = "system"
const USER   = "user"

const DEFAULT_USER_NAMES = [
    "Asher Dubuc",
]

const MOCKING_PHRASES = [
    "Asher?",
    "Is this Sigma Asher?",
    "Sigma Asher, are you there?",
    "Sigma sigma Asher sigma Asher sigma Asher!",
    "Asher some people think you have no jawline",
    "I'm not one of those people Asher.",
    "You DO have a jawline Asher. It's hidden under your sigma",
    "It's okay Asher, I don't think you have a Gerbil Face(TM)",
    "You have about... 6... 6 7... 6 or 7 inches of jawline under that Gerbil Skin(TM)",
]

const RANDOM_PHRASES = [
    "This is so sigma.",
    "Skibidi skibidi Asher skibidi Asher skibidi Asher!",
    "You're the most sigma Asher of all time.",
    "Sigma sigma Asher sigma Asher sigma Asher!",
    "You mog me Asher",
    "You mog EVERYONE, Asher",
    "Not even my creator's Blinding Cranium Flash could stop your sigma 👅👅",
    "Mira wants you",
    "56 missed calls from Mira",
    "Baddie Mira wants you Asher",
    "No more skibidi, I'll be Sigma, like I'm born to mew!",
    "Fruit flies, fruit flies, fruit fruit flies flies flies",
]

function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
}

let mockingCounter = 0;
function mockingPhrase(message) {
    if (mockingCounter < MOCKING_PHRASES.length)
        return MOCKING_PHRASES[mockingCounter ++];
    else if(Math.random() > 0.75)
        return mock(message)
    else
        return pick(RANDOM_PHRASES)
}

let userName = pick(DEFAULT_USER_NAMES);

document.documentElement.style.setProperty("--user-name", `"${userName}"`);
document.documentElement.style.setProperty("--system-name", `"SigmaAsherGlazerBot2000"`);

let counter = 0;

function next(list) {
    if (counter >= list.length) return pick(list);
    else return list[counter++ % list.length];
}

chatUserInput.value = userName; // mr mcgee is still too fast smh smh smh smh smh

function postMessage(message, by=SYSTEM) {
    const el = document.createElement("div");
    el.classList.add("message", `by-${by}`);
    el.innerText = message;
    console.log(message);

    chatBody.appendChild(el);
    chatBody.scrollTop = chatBody.scrollHeight
}

function wait(ms) {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    })
}

function processMessage(message, by=USER) {
    postMessage(message, by);

    wait(Math.random() * 500 + 1000).then(() => {
        postMessage(mockingPhrase(message));
    })
}

function mock(message) {
    return [...message.toLowerCase()].map((c, i) => {
        return Math.random() > 0.5 ? c.toUpperCase() : c;
    }).join("")
}

chatInputSend.addEventListener("click", () => {
    const message = chatInputText.value;
    chatInputText.value = "";
    processMessage(message);
});

chatInputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const message = chatInputText.value;
        chatInputText.value = "";
        processMessage(message);
    }
});

chatUserInput.addEventListener("blur", (e) => {
    userName = chatUserInput.value;
    document.documentElement.style.setProperty("--user-name", `"${userName}"`);
})

postMessage("Hello... wait, is this who I think it is?")