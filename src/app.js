let speech = new SpeechSynthesisUtterance();
console.log(speech);
let pausedResumedBtn = document.querySelector("#pause-resume");

let voices = [];
let select = document.querySelector("select");

// Event listener for when the list of available voices changes
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((element, i) => {
        select.options[i] = new Option(element.name, i);
    });
};

// Event listener for when a voice is selected from the dropdown
select.addEventListener("change", () => {
    speech.voice = voices[select.value];
})

const textArea = document.querySelector("textarea");

// Event listenter for to listen the speech
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

// Event listener for to clear the textArea
document.querySelector("#to-clear").addEventListener("click", () => {
    textArea.value = "";
    window.speechSynthesis.cancel();
   pauseBtn(true);
});


let isSpeechPaused =false;

// Event listener for paused or resumed the speech
pausedResumedBtn.addEventListener("click",()=>{
    if(isSpeechPaused){
        window.speechSynthesis.resume();
    }
    else{
        window.speechSynthesis.pause();
    }
    pausedResumedBtn.textContent = isSpeechPaused?"Paused":"Resumed";
    isSpeechPaused =! isSpeechPaused;
})

// Function to enable/disable the pause/resume button
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
//when speech is end paused/resumed button goes disabled 
speech.onend = (event) => {
    pauseBtn(true);
}

// Event listener for cancel the  speech when page is loading
window.onload = ()=>{
    window.speechSynthesis.cancel();
}
