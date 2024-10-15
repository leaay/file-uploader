import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { fileTypes } from "./schema";

export const createFile = mutation({
    args:{
        name: v.string(),
        ownerID: v.string(),
        fileID : v.id("_storage"),
        fileType: fileTypes,
    },
    async handler(ctx, args){

        const isUserLoggedIn = await ctx.auth.getUserIdentity()
        if(!isUserLoggedIn){
            throw new ConvexError('Please login')
        }

        const test = await ctx.storage.getUrl(args.fileID)

        await ctx.db.insert("files", {
            name : args.name,
            ownerID: args.ownerID,
            fileID: args.fileID,
            fileType:args.fileType
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
        .withIndex('by_owner', q=> q.eq('ownerID', args.ownerID.toString() ))
        .collect()

        const filesWithUrl = await Promise.all(
            files.map(async (file) =>({
                ...file,
                url:await ctx.storage.getUrl(file.fileID) 
            }))
        )

        return filesWithUrl

    },
    
});

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const deleteFile = mutation({
    args:{
        _id : v.id("files"),
        fileID : v.id("_storage")
    },
    async handler(ctx, args){

        const isUserLoggedIn = await ctx.auth.getUserIdentity()

        if(!isUserLoggedIn){
            throw new ConvexError('Please login')
        }

        await ctx.db.delete(args._id);
        await ctx.storage.delete(args.fileID)

    },

});