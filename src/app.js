let speech = new SpeechSynthesisUtterance();
console.log(speech);
let pausedResumedBtn = document.querySelector("#pause-resume");

let voices = [];
let select = document.querySelector("select");
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((element, i) => {
        select.options[i] = new Option(element.name, i);
    });
};


select.addEventListener("change", () => {
    speech.voice = voices[select.value];
})

const textArea = document.querySelector("textarea");

document.querySelector("#to-listen").addEventListener("click", (event) => {
    if(textArea.value.trim() !== ""){
    event.preventDefault();
    window.speechSynthesis.cancel()
    speech.text = textArea.value;
    console.log(speech);
    window.speechSynthesis.speak(speech);
    pauseBtn(false);
    }
});

document.querySelector("#to-clear").addEventListener("click", () => {
    textArea.value = "";
    window.speechSynthesis.cancel();
   pauseBtn(true);
});


let isSpeechPaused =false;


pausedResumedBtn.addEventListener("click",()=>{
    if(isSpeechPaused){
        window.speechSynthesis.resume();
    }
    else{
        window.speechSynthesis.pause();
    }
    pausedResumedBtn.textContent = isSpeechPaused?"Paused":"Resumed";
    isSpeechPaused =!isSpeechPaused;
})

function pauseBtn(boolean){
    pausedResumedBtn.disabled = boolean;
    pausedResumedBtn.textContent = "Paused";
    isSpeechPaused = false;
}

// speech.onpause = (event) => {
//     console.log("Paused");
// }
// speech.onresume = (event) => {
//     console.log("Resume");
// }
// speech.onstart = (event) => {
//     console.log("Start");
// }
speech.onend = (event) => {
    pauseBtn(true);
}

window.onload = ()=>{
    window.speechSynthesis.cancel();
}