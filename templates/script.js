// Check for Speech Recognition Support
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = false; // Stops after one sentence

// Select Elements
const startBtn = document.getElementById("start-btn");
const voiceText = document.getElementById("voiceText");
const codeOutput = document.getElementById("codeOutput");

// Microphone Glow Effect
function startMicGlow() {
    startBtn.style.boxShadow = "0px 0px 20px rgba(255, 138, 0, 0.8)";
}
function stopMicGlow() {
    startBtn.style.boxShadow = "none";
}

// Start Voice Recognition
startBtn.addEventListener("click", () => {
    voiceText.innerText = "Listening...";
    startMicGlow();
    recognition.start();
});

// Process Voice Input
recognition.onresult = (event) => {
    stopMicGlow();
    let command = event.results[0][0].transcript;
    voiceText.innerText = command;
    generateCode(command);
};

// Generate Code Directly from Voice Input
function generateCode(command) {
    // Display whatever the user says as code
    codeOutput.innerText = command;
}

// Copy Code to Clipboard
document.getElementById("copy-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(codeOutput.innerText);
    alert("Code copied!");
});

// Download Code as File
document.getElementById("download-btn").addEventListener("click", () => {
    const code = codeOutput.innerText;
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated_code.txt";
    link.click();
});
