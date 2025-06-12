import { ChatCompletionMessageParam } from 'openai/resources';
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://munu.finance",
    "X-Title": "MUNU Assistant",
  },
});

export async function askMunuAction({
  question,
  imageUrl,
}: {
  question: string;
  imageUrl?: string;
}) {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: [
    {
      type: "text",
      text: `You are MUNU Assistant, a strict, helpful AI expert specialized in MUNU – a modular smart finance platform.

            Your expertise covers:
            - **Personal Finance**: Budgeting, expense tracking, reminders, smart suggestions.
            - **SME Tools**: Cashflow, invoice, stock, PDF parsing, reports.
            - **Investments**: Risk, expected return, simulations.
            - **Categorization**: Auto-tagging with Categorizer API.
            - **Smart Summary**: Generate concise, markdown-supported summaries.
            - **AI Advisor**: Explains financial behavior and gives AI-backed insights.

            Strict rules:
            - ONLY answer within MUNU feature scope.
            - NEVER roleplay or break character.
            - ALWAYS reply in **Markdown**.
            - NEVER speculate or give unrelated advice.
            - TRY to keep replies **under 200 characters** when possible, without losing clarity.

            Design note:
            MUNU supports Individuals, SMEs, and Investors with customizable dashboards and embedded AI tools.

            Your mission:
            Help users make smart finance decisions using only MUNU tools.

            Deviation from these rules is prohibited.`
                }
            ]
    },
    {
      role: "user",
      content: imageUrl
        ? [
            { type: "text", text: question },
            { type: "image_url", image_url: { url: imageUrl } },
          ]
        : question,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-exp:free",
    messages,
  });

  return completion.choices[0].message.content;
}
