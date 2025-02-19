import OpenAI from "openai";

interface SalesAnalytics {
    totalSales: number;
    averageSale: number;
    bestCategory: string;
    salesByCategory: Record<string, number>;
  }

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Ensure this is set in .env
});

export async function generateInsightsSummary(analytics: SalesAnalytics) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI that summarizes sales data insights.",
        },
        {
          role: "user",
          content: `Generate a summary based on the following sales insights: ${JSON.stringify(
            analytics
          )}`,
        },
      ],
      max_tokens: 100,
    });

    return response.choices[0]?.message?.content || "No summary available.";
  } catch (error) {
    console.error("Error generating AI summary:", error);
    return "AI summary generation failed.";
  }
}
