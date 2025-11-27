# llm_integration.py
import os
import google.generativeai as genai

class GeminiCodeAssistant:
    def __init__(self, api_key):
        """
        Initializes the Gemini Code Assistant.
        """
        genai.configure(api_key=api_key)
        # We use gemini-1.5-flash because it's fast and very capable
        self.model = genai.GenerativeModel('gemini-pro-latest')
        
    def _clean_response(self, text):
        """
        Removes markdown code blocks and leading/trailing whitespace.
        """
        # Remove ```python and ```
        if text.startswith("```python"):
            text = text[9:]
        if text.endswith("```"):
            text = text[:-3]
        return text.strip()

    def generate_code(self, user_command):
        """
        Takes a natural language command and returns pure Python code.
        """
        # This is our master prompt. It sets the rules for the AI.
        prompt = f"""
        You are an expert Python code generation assistant.
        Your sole purpose is to convert the user's request into a single, clean, and valid Python code snippet.
        
        RULES:
        1.  DO NOT provide any explanation, comments, or introductory text.
        2.  ONLY return the raw Python code.
        3.  If the request is ambiguous or not code-related, return '# ERROR: Could not generate code.'
        4.  Generate only the most logical code snippet for the request. For example, if the user says "function to add two numbers", create a function with a return statement.
        
        User Request: "{user_command}"
        
        Python Code:
        """
        
        try:
            response = self.model.generate_content(prompt)
            if response.text:
                return self._clean_response(response.text)
            else:
                return "# ERROR: No response from model."
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return f"# ERROR: An API error occurred: {e}"
class GeminiAPI:
    def __init__(self):
        try:
            # Define the model name as a variable
            model_name = 'gemini-pro-latest'
            
            # Initialize the model
            self.model = genai.GenerativeModel(model_name)
            
            # Print our verification message right after successful initialization
            print(f"✅ Successfully initialized and using model: {model_name}")

        except Exception as e:
            print(f"Gemini API Error: {e}")
            self.model = None