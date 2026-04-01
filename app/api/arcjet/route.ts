import aj from "@/lib/arcjet";
import { isSpoofedBot } from "@arcjet/inspect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = "user123";

    const decision = await aj.protect(req, {
      userId,
      requested: 1,
    });

    if (isSpoofedBot(req)) {
      return NextResponse.json(
        { error: "Spoofed bot detected" },
        { status: 403 }
      );
    }

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },
        { status: 429 }
      );
    }

    return NextResponse.json({ message: "Hello world" });

  } catch (err) {
    console.error("Arcjet Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}