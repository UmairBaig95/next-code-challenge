import { NextRequest, NextResponse } from "next/server";
import { processSalesData } from "@/utils/salesProcessor";
import { generateInsightsSummary } from "@/utils/aiIntegration";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json(
        { error: "Invalid sales data" },
        { status: 400 }
      );
    }

    // Process sales data
    const analytics = processSalesData(body);

    // Generate AI summary
    const summary = await generateInsightsSummary(analytics);

    return NextResponse.json({ analytics, summary }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
