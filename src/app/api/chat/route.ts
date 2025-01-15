import { createOpenAI } from "@ai-sdk/openai";

import { streamText, convertToCoreMessages } from "ai";
import { NextRequest } from "next/server";

export const runtime = "edge";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPEN_API_BASE_URL,
});

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
