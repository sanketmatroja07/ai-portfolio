import { NextResponse } from "next/server";
import { getUsedTechnologies, getTechnologiesByCategory } from "@/data/technologies";

export async function GET() {
  const technologies = getUsedTechnologies();
  const grouped = getTechnologiesByCategory();

  return NextResponse.json({ technologies, grouped });
}
