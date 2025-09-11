
import { mutation, query } from "./_generated/server";
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
  
export const GetUserTrips = query({
  args: {
    uid: v.id("UserTable")
    },
    handler:async(ctx,args)=>{
      const result=await ctx.db.query('TripDetailTable')
      .filter(q=>q.eq(q.field('uid'),args.uid))
      .order('desc')
      .collect();
      return result;
    }  // must match your schema  
});


export const GetTripById = query({
  args: {
    uid: v.id("UserTable"), 
    tripId: v.string()
    },
    handler:async(ctx,args)=>{
      const result=await ctx.db.query('TripDetailTable')
      .filter(q=>q. and(q.eq(q.field('uid'),args.uid),
      q.eq(q.field('tripId'),args.tripId)))
      
      .collect();
      return result[0];
    }  // must match your schema  
});

