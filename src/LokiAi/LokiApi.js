import { GoogleGenAI } from '@google/genai';

async function askGemini(query) {
  const genAI = new GoogleGenAI({
    apiKey: 'AIzaSyDZSGjkwbOkrFtGkfGu2Ix8vvND7hqFg-Y', 
  });

  const response = await genAI.models.generateContent({
    // gemini-2.0-pro-exp
    model: 'gemini-1.5-flash',
    contents: [
      {
        role: 'user',
        parts: [{ text: query }],
      },
    ],
  });

  console.log("Full Gemini Response:", response);

  const responseText = response.candidates[0]?.content?.parts[0]?.text || "No response text available";
  return responseText;
}

export { askGemini };
