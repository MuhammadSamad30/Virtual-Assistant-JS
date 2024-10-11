const btn = document.querySelector("#btn");
const search = document.querySelector("#search")

function speak(text) {
    const textSpeech = new SpeechSynthesisUtterance(text);
    textSpeech.rate = 1;
    textSpeech.pitch = 1;
    textSpeech.volume = 1;
    textSpeech.lang = "en-GB";
    window.speechSynthesis.speak(textSpeech);
}

function getPakistanTime() {
    const date = new Date();
    const utcHour = date.getUTCHours();
    const pakistanHour = (utcHour + 5) % 24;
    return pakistanHour;
}

function welcomeUser() {
    const hour = getPakistanTime();

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
    if (message.includes('who are you') || message.includes('hu r u')) {
        speak("I'm Robo, your virtual assistant, developed by Muhammad Samad sir");
    }
    else  if (message.includes('hey') || message.includes('hello')) {
        speak('Hello Sir, how can I help you?');
    }
     else if (message.includes('open tiktok')){
        window.open("https://www.tiktok.com", "_blank");
        speak("opening tiktok")
    }
     else if (message.includes('open google')) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    }
     else if (message.includes('open youtube')) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } 
     else if (message.includes('open facebook')) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    }
     else if (message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram...");
    }
     else if (message.includes('open github') || message.includes('open get up')) {
        speak("Opening GitHub");
        window.open("https://github.com", "_blank");
    }
      else if (message.includes('open linkedin')) {
        speak("Opening LinkedIn");
        window.open("https://www.linkedin.com", "_blank");   
    } 
    else if (message.includes("open twitter")) {
        window.open("https://twitter.com", "_blank");
        speak("Opening Twitter...");
    } 
    else if (message.includes("open gmail")) {
        window.open("https://mail.google.com", "_blank");
        speak("Opening Gmail...");
    }
    else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } 
    else if (message.includes('time') || message.includes('what is time')){
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is" + time;
        speak(finalText);
    } 
    else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } 
    else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } 
    else if (message.includes('weather')) {
        window.open("https://weather.com", "_blank");
        speak("Here is the weather information for your location.");
    }
     else if (message.includes('translate')) {
        const translation = message.replace('translate', '').trim();
        speak(`Currently, I cannot translate text directly, but you can use Google Translate for that.`);
        window.open(`https://translate.google.com/?sl=auto&tl=en&text=${translation}&op=translate`, "_blank");
    }
    else if (message.includes('on youtube')) {
        const searchResult = message.replace('on youtube', '').trim();
        window.open(`https://www.youtube.com/results?search_query=${searchResult}`, "_blank");
        speak(`Searching on YouTube for ${searchResult}`);
    }
    else if (message.includes('play a song')) {
        const songName = message.replace('play a song', '').trim();
        window.open(`https://www.youtube.com/results?search_query=${songName}`, "_blank");
        speak(`Playing ${songName} on YouTube.`);
    }
    else if (message.includes('restart my computer') || message.includes('shut down my computer')) {
        speak("I cannot restart your computer, but you can do it manually by going to your system settings.");
    }  
    else if (message.includes('calculate')) {
        try {
            const calculation = message.replace('calculate', '').trim();
            const result = eval(calculation);
            speak(`The result of ${calculation} is ${result}`);
        } catch (error) {
            speak("I could not perform the calculation. Please make sure your expression is correct.");
        }
    } 
    else {
        window.open(`https://www.google.com/search?q=${message.replace('+', '')}`, "_blank");
        const finalText = `I found some information for ${message} on Google`;
        speak(finalText);
    }
}
