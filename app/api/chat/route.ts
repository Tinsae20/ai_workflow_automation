import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 30;

export async function POST(request: Request) {
    const { messages } = (await request.json()) as { messages : UIMessage[] }

    const result = await streamText({
        model: google("gemini-2.5-pro"),
        system: 
            "You are a helpful assistant. Use tools when they help answer the user's question.",
        messages: convertToModelMessages(messages)
    });

    return result.toUIMessageStreamResponse();
}