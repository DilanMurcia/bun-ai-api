import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AIService, ChatMessage } from '../types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const googleGeminiService: AIService = {
  name: 'GoogleGemini',
  async chat(messages: ChatMessage[]) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const stream = await model.generateContentStream({
      contents: messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })) as any,
    });

    return (async function* () {
      for await (const chunk of stream.stream) {
        const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (text) yield text;
      }
    })()
  }
}
