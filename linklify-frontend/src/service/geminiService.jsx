import axios from 'axios';
import { stringify } from "flatted";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const iaModel = import.meta.env.VITE_GEMINI_MODEL;
const language = localStorage.getItem('i18nextLng') || 'es';

export const GeminiEndpoint = async (text) => {
     
    const prompt = `You are an expert English language proofreader. Analyze and correct the following English text for:
  1. Grammar mistakes
  2. Spelling errors
  3. Punctuation issues
  4. Awkward phrasing
  5. Improper word choice
  6. Unnatural expressions

  Text to analyze: "${text}"

  Provide your response in this exact JSON format:
  {
    "correctedText": "The professionally corrected English text",
    "corrections": [
      "Error type: Specific explanation of the mistake and why it was corrected",
      "Error type: Specific explanation of the mistake and why it was corrected"
    ]
  }

  Important rules:
  - Only correct actual errors in the English text
  - Maintain the original meaning and intent
  - Do NOT translate to another language
  - Keep specialized terms and names unchanged
  - Return ONLY valid JSON without any additional text
  - Number each correction sequentially
  - Specify error types (grammar, spelling, etc.) in each explanation
  - Keep corrections concise but informative
  - Preserve the original tone (formal/informal)`;



    try {
        const geminiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${iaModel}:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const responseText = geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!responseText) {
            throw new Error("La respuesta de la API no contiene texto");
        }

        // Limpiar la respuesta para extraer solo el JSON
        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}') + 1;
        const jsonString = responseText.slice(jsonStart, jsonEnd);
        // Intentamos parsear el JSON de la respuesta
        try {
            const parsedResponse = JSON.parse(jsonString);

            if (!parsedResponse.correctedText) {
                throw new Error("El JSON no contiene el texto corregido");
            }

            return {
                correctedText: parsedResponse.correctedText,
                corrections: parsedResponse.corrections || []
            };
        } catch (e) {
            console.error("Error parsing Gemini response:", e);
            console.error("Response text:", responseText);
            throw new Error("La respuesta de la API no tiene el formato esperado");
        }
    } catch (error) {
        throw error;
    }
};