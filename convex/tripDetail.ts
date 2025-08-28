// import { mutation } from "./_generated/server";
// import { v } from "convex/values";
// export const CreateTripDetail = mutation({
//   args: {
//     tripId: v.string(),
//     uid: v.id("UserTable"),
//     tripDetail: v.any()
//   },
//   handler:async(ctx, args) => {
//     const result =await ctx.db.insert("TripDetailTable", {
//       tripDetail: args.tripDetail,
//       tripId: args.tripId,
//       uid: args.uid
//     });
//   }
// })

// import { mutation } from "./_generated/server";
// import { v } from "convex/values";

// // Mutation to save trip details
// export const CreateTripDetail = mutation({
//   args: {
//     tripId: v.string(),
//     uid: v.id("UserTable"), // Reference to user document in "UserTable"
//     tripDetail: v.any() // Can be improved later with a structured schema
//   },
//   handler: async (ctx, { tripId, uid, tripDetail }) => {
//     // Insert trip details into "TripDetailTable"
//     const insertedId = await ctx.db.insert("TripDetailTable", {
//       tripId,
//       uid,
//       tripDetail,
//     });
//   }
// });

// import { mutation } from "./_generated/server";
// import { v } from "convex/values";

// export const CreateTripDetail = mutation({
//   args: {
//     tripDetail: v.any(),
//     tripId: v.string(),
//     uid: v.string(),
//   },
//   handler: async (ctx, args) => {
//     return await ctx.db.insert("trips", {
//       tripId: args.tripId,
//       tripDetail: args.tripDetail,
//       uid: args.uid,
//       createdAt: Date.now(),
//     });
//   },
// });


import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateTripDetail = mutation({
  args: {
    tripDetail: v.any(),
    tripId: v.string(),
    uid: v.id("UserTable"),   // must match your schema
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("TripDetailTable", {
      tripId: args.tripId,
      tripDetail: args.tripDetail,
      uid: args.uid,
    });
  },
});
