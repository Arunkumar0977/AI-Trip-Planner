// import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
// import { isSpoofedBot } from "@arcjet/inspect";
// import { NextResponse } from "next/server";
// import { error } from "console";


// export const aj = arcjet({
//   key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
//   rules: [
//     // Shield protects your app from common attacks e.g. SQL injection
//     shield({ mode: "LIVE" }),
//     // Create a bot detection rule
//     detectBot({
//       mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
//       // Block all bots except the following
//       allow: [
//         "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
//         // Uncomment to allow these other common bot categories
//         // See the full list at https://arcjet.com/bot-list
//         //"CATEGORY:MONITOR", // Uptime monitoring services
//         //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
//       ],
//     }),
//     // Create a token bucket rate limit. Other algorithms are supported.
//     tokenBucket({
//       mode: "LIVE",
//       characteristics: ["userId"],    // new added
//       refillRate: 5,
//       interval: 84000, // 10 sec
//       capacity: 30     // Track by userId
//     }),
//   ],
// });

// export async function GET(req: Request) {
//   const userId = "user123";
//   const decision = await aj.protect(req, {userId, requested: 5});

//   // console.log("Arcjet decision", decision);

//   if (decision.isDenied()) {
//     return NextResponse.json(
//       { error: "Too Many Requests", reason: decision.reason },
//       { status: 429 },
//     );
//   }

//   return NextResponse.json({ message: "Hello world" });
// }


import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
import { isSpoofedBot } from "@arcjet/inspect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // ✅ Initialize inside the handler to avoid module-level export conflicts
    const aj = arcjet({
      key: process.env.ARCJET_KEY || "",
      rules: [
        shield({ mode: "LIVE" }),

        detectBot({
          mode: "LIVE",
          allow: ["CATEGORY:SEARCH_ENGINE"],
        }),

        tokenBucket({
          mode: "LIVE",
          characteristics: ["userId"],
          refillRate: 5,
          interval: 10,
          capacity: 30,
        }),
      ],
    });

    const userId = "user123"; // 🔥 replace with real user later

    // ✅ Arcjet protection
    const decision = await aj.protect(req, {
      userId,
      requested: 1,
    });

    // ✅ Extra spoofed bot protection
    if (isSpoofedBot(req)) {
      return NextResponse.json(
        { error: "Spoofed bot detected" },
        { status: 403 }
      );
    }

    // ✅ Rate limit / block handling
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