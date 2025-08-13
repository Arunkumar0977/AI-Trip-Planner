// convex/tripDetail.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateTripDetail = mutation({
  args: {
    tripDetail: v.any(),
    tripId: v.string(),
    uid: v.id("UserTable"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("TripDetailTable", {
      tripDetail: args.tripDetail,
      tripId: args.tripId,
      uid: args.uid,
    });
  },
});
