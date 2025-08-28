// import { mutation } from "./_generated/server";
// import { v } from "convex/values";

//  export const CreateNewUser = mutation({
//    args:{
//         name:v.string(),
//         email: v.string(),
//         imageUrl: v.string(),

//         },
//         handler: async (ctx, args) => {
//         //if user already exists, 
//         const user=await ctx.db.query("UserTable").filter(q => q.eq(q.field("email"), args.email))
//         .collect();

//         if(user?.length == 0){
//           const userData={
//             name: args.name,
//             email: args.email,
//             imageUrl: args.imageUrl,
//           }
//           //if not exists, create a new user
//           await ctx.db.insert("UserTable", userData);
//           return userData;
//         }
//         return user[0]; // return existing user
//     }
// })




import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("UserTable")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();

    if (!existingUser) {
      // If not exists, create a new user
      const userData = {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
      };
      await ctx.db.insert("UserTable", userData);
      return userData;
    }

    // Return existing user
    return existingUser;
  },
});
