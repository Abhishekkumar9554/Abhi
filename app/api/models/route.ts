import { NextResponse } from "next/server";
import { modelCatalog } from "@/lib/ai-providers";

export async function GET() {
  return NextResponse.json({ models: modelCatalog });
}
