const API_URL = "http://127.0.0.1:5000";

function cleanAIOutput(text) {
    if (!text) return "";

    return text
        .replace(/```python/g, "")   
        .replace(/```/g, "")         
        .replace(/\*\*/g, "")        
        .replace(/###/g, "")         
        .replace(/__/g, "")          
        .trim();
}


async function debugCode() {
    let code = document.getElementById("debugInput").value;

    document.getElementById("debugOutput").innerText = "Generating code... Please wait...";

    let res = await fetch(`${API_URL}/debug`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
    });

    let data = await res.json();
    document.getElementById("debugOutput").innerText = cleanAIOutput(data.output);
}

async function autoFix() {
    let code = document.getElementById("debugInput").value;

    document.getElementById("debugOutput").innerText = "Generating code... Please wait...";


    let res = await fetch(`${API_URL}/autofix`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ code })
    });

    let data = await res.json();
    document.getElementById("debugOutput").innerText = cleanAIOutput(data.output);
}

async function generateTestCases() {
    let code = document.getElementById("debugInput").value;

    document.getElementById("debugOutput").innerText = "Generating code... Please wait...";

    let res = await fetch(`${API_URL}/testcases`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ code })
    });

    let data = await res.json();
    document.getElementById("debugOutput").innerText = cleanAIOutput(data.output);

}

function copyDebugOutput() {
    let text = document.getElementById("debugOutput").innerText;
    navigator.clipboard.writeText(text);
    alert("Output copied!");
}
function initVoice() {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Your browser does not support voice recognition. Use Google Chrome.");
        return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    const micBtn = document.getElementById("micBtn");

    micBtn.onclick = () => {
        recognition.start();
        micBtn.innerText = "🎤 Listening...";
        micBtn.disabled = true;
    };

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        document.getElementById("codeInput").value += "\n" + text;
    };

    recognition.onerror = (event) => {
        alert("Mic Error: " + event.error);
    };

    recognition.onend = () => {
        micBtn.innerText = "🎤 Speak Code";
        micBtn.disabled = false;
    };
}

async function generateCode() {
    let prompt = document.getElementById("codeInput").value;

    if (!prompt.trim()) {
        alert("Please type or speak something first!");
        return;
    }

    document.getElementById("outputBox").innerText = "Generating code... Please wait...";

    let res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ prompt })
    });

    let data = await res.json();
    document.getElementById("outputBox").innerText = cleanAIOutput(data.output);
}

function copyGeneratedCode() {
    let text = document.getElementById("outputBox").innerText;

    if (!text.trim()) {
        alert("There is no code to copy!");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => alert("Code copied to clipboard!"))
        .catch(err => alert("Failed to copy: " + err));
}


initVoice();
