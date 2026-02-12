
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateBrandImage = async (prompt: string, retries = 1): Promise<string | null> => {
  let attempt = 0;
  
  while (attempt <= retries) {
    try {
      const ai = getAIClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
          },
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
      return null;
    } catch (error: any) {
      const errorMsg = error?.message || "";
      const isQuotaExceeded = errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('RESOURCE_EXHAUSTED');
      
      if (isQuotaExceeded) {
        // For quota exhaustion, we throw immediately to stop the caller's loop
        console.error("Gemini API Quota Exhausted: Stopping image generation to prevent further errors.");
        throw new Error("QUOTA_EXHAUSTED");
      }
      
      attempt++;
      if (attempt <= retries) {
        const backoffTime = 2000 * Math.pow(2, attempt - 1);
        console.warn(`Image generation attempt ${attempt} failed. Retrying in ${backoffTime}ms...`);
        await sleep(backoffTime);
        continue;
      }

      console.error("Image generation failed after retries:", error);
      return null;
    }
  }
  return null;
};
