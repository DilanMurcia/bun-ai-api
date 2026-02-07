import OpenAI from "openai";
import type { AIService, ChatMessage } from '../types';

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const openrouterService: AIService = {
  name: 'OpenRouter',
  async chat(messages: ChatMessage[]) {
    const stream = await openrouter.chat.completions.create({
      model: "meta-llama/llama-2-7b-chat",
      messages: messages,
      stream: true,
      max_tokens: 4096,
      temperature: 0.6,
      top_p: 1,
    });

    return (async function* () {
      for await (const chunk of stream) {
        yield chunk.choices[0]?.delta?.content || ''
      }
    })()
  }
}
