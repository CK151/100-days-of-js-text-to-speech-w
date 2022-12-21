const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const speechBtnDiv = document.querySelector("#speech-btn");
const micBtn = document.querySelector(".btn .fas");
const instructions = document.querySelector(".instructions");

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


//check for browser support

if (speechRecognition) {
    //console.log("SPEECH!!!");

    const recognition = new speechRecognition();

    micBtn.addEventListener("click", micBtnClicked);

    function micBtnClicked(e) {
        e.preventDefault();
        if (micBtn.classList.contains("fa-microphone")) {
            recognition.start();
        }
        else {
            recognition.stop();
        }
    }

    //start recongnition

    recognition.addEventListener("start", () => {
        micBtn.classList.remove("fa-microphone");
        micBtn.classList.add("fa-microphone-slash");
        instructions.textContent = "Recording..., Ctrl + k to stop";
        searchInput.focus();
        console.log("on");

    });

    //stop recongnition

    recognition.addEventListener("end", () => {
        micBtn.classList.add("fa-microphone");
        micBtn.classList.remove("fa-microphone-slash");
        
        instructions.textContent = "Press Ctrl + x or Click the Mic Icon to start recording";
        searchInput.focus();
        console.log("off");

    });

    //get results of speech recognition
    recognition.continuous = true
    //let content = "";
    recognition.addEventListener("result", (e) => {
        console.log(e);
        const current = e.resultIndex;
        const transcript = e.results[current][0].transcript;

        if (transcript.toLowerCase().trim() === "stop recording") {
            recognition.stop();
        }
        else if (!searchInput.value) {
            searchInput.value = transcript;
        }
        else {
            if (transcript.toLowerCase().trim() === "search") {
                searchForm.submit()
            }
            else if (transcript.toLowerCase().trim() === "reset"){
                searchInput.value = "";
            }
            else {
                searchInput.value = transcript;
            }
        }
    });


    //add keybord event listener

    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "x") {
            recognition.start();
        }

        if (e.ctrlKey && e.key === "k") {
            recognition.stop();
        }
    });
}
else {
    console.log("not suppoeted");
    speechBtnDiv.style.display = "none"
}