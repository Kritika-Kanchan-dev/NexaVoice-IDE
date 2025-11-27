# ✨ Core Feature
- The primary goal of this project is to provide a hands-free coding experience for generating snippets and functions.

- 🎤 Voice-to-Code Generation: Describe a function or a piece of logic in plain English. The application captures your voice, sends it to the Gemini API, and generates the corresponding Python code for you.
- 📝 Simple GUI Editor: A clean graphical user interface built with Python's native Tkinter library, providing a text area to view the generated code.
- 🚀 Responsive UI: The application uses threading to process voice recognition and API calls in the background, ensuring the user interface remains responsive and doesn't freeze.
- ⚙️ Secure API Key Handling: Manages the Gemini API key securely using a .env file, keeping your credentials separate from the source code.
- 🛠️ How It Works

## The application follows a simple workflow:

- The user clicks the "Start Listening" button in the GUI.
- A background thread starts listening for audio from the user's microphone using the SpeechRecognition library.
- The captured audio is transcribed into a text command.
- This command is sent as a prompt to the Google Gemini API to generate Python code.
- The code returned by Gemini is inserted directly into the text editor.

# 📦 Setup and Installation
### Follow these steps to get the project running on your local machine.

- 1. Prerequisites
Python 3.10 or higher.
A Google Gemini API key. You can get one from Google AI Studio.
- 2. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-repository-directory>
```

- 3. Set Up a Virtual Environment
It's highly recommended to use a virtual environment to manage project dependencies.

### On macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```
### On Windows:

```bash
python -m venv venv
.\venv\Scripts\activate
```

- 4. Install Dependencies
Created a requirements.txt install them using the following command:

```bash
pip install -r requirements.txt
```

Note: pyaudio can sometimes be tricky to install. If you encounter issues, you may need to install system-level dependencies first (like portaudio on macOS/Linux or using a pre-compiled wheel on Windows).

- 5. Configure Your API Key
Create a file named .env in the root directory of the project.

Add your Gemini API key to this file in the following format:

```markdown
GEMINI_API_KEY="YOUR_SUPER_SECRET_API_KEY"
``` 

## 🚀 How to Use
Run the main application file from your terminal:
```bash
python voice_ide.py
```
The GUI window will appear. Click the "Start Listening" button.
Speak a command clearly into your microphone.
Example Voice Commands
- "Create a Python function that takes a list and returns the sum."
- "Write a script to read a CSV file using pandas."
- "Generate a simple Flask application."
