import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
    args:{
        name: v.string()
    },
    async handler(ctx, args){

        const isUserLoggedIn = await ctx.auth.getUserIdentity()

        if(!isUserLoggedIn){
            throw new ConvexError('Please login')
        }


        await ctx.db.insert("files", {
            name : args.name
        });

    },

});

export const getFile = query({
    args:{},
    async handler(ctx ,args){

        const isUserLoggedIn = await ctx.auth.getUserIdentity()

        if(!isUserLoggedIn){
            return [];
        }

        return ctx.db.query("files").collect();

    },
    
});