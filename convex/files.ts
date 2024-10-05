import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
    args:{
        name: v.string(),
        orgID: v.string(),
        fileID : v.id("_storage")
    },
    async handler(ctx, args){

        const isUserLoggedIn = await ctx.auth.getUserIdentity()
        if(!isUserLoggedIn){
            throw new ConvexError('Please login')
        }

        await ctx.db.insert("files", {
            name : args.name,
            orgID: args.orgID,
            fileID: args.fileID
        });

    },

});

export const getFile = query({

    args:{ownerID: v.string(),},

    async handler(ctx ,args){

        const isUserLoggedIn = await ctx.auth.getUserIdentity()

        if(!isUserLoggedIn){
            return [];
        }

        if(args.ownerID === 'skip'){
            throw new ConvexError('ACCESC DENIED')
        }


        const files = await ctx.db

        .query("files")
        .withIndex('by_owner', q=> q.eq('orgID', args.ownerID.toString() ))
        .collect()

        return files

    },
    
});

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});