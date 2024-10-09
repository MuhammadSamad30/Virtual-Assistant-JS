const btn = document.querySelector("#btn");
const search = document.querySelector("#search")

function speak(text) {
    const textSpeech = new SpeechSynthesisUtterance(text);
    textSpeech.rate = 1;
    textSpeech.pitch = 1;
    textSpeech.volume = 1;
    textSpeech.lang = "en-US";
    window.speechSynthesis.speak(textSpeech);
}

function welcomeUser() {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning sir");
    } else if (hour >= 12 && hour <= 16) {
        speak("Good Afternoon sir");
    } else if (hour > 16 && hour <= 20) {
        speak("Good Evening sir");
    } else {
        speak("Good Night sir");
    }
}

window.addEventListener("load", welcomeUser);

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript.toLowerCase().trim();
    search.innerText = transcript;
    takeCommand(transcript);
};


if (btn) {
    btn.addEventListener("click", () => {
        search.innerHTML = `Listening <i class="fa-solid fa-ellipsis fa-beat-fade"></i>`
        recognition.start();
    });
}

function takeCommand(message) {

    if (message.includes("who are you") || message.includes("hu r u")) {
        speak("I'm Robo, your virtual assistant, developed by Muhammad Samad sir");
    }else  if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, how can I help you?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes("open instagram")) {
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram...");
    } else if (message.includes("open github")) {
        speak("Opening GitHub");
        window.open("https://github.com", "_blank");
     } else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn");
        window.open("https://www.linkedin.com", "_blank");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')){
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is" + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
