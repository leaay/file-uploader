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
            fileType:args.fileType,
            isFavourite:false
        });

    },

});

export const getFile = query({

    args:{
        ownerID: v.string(),
        query: v.optional(v.string()),
        fav: v.optional(v.boolean())
    },

    async handler(ctx ,args){

        const isUserLoggedIn = await ctx.auth.getUserIdentity()

        if(!isUserLoggedIn){
            return [];
        }

        if(args.ownerID === 'skip'){
            throw new ConvexError('ACCESC DENIED')
        }
        
        console.log(args.query?.toLocaleLowerCase())

        const baseQuery = args.fav
                ? ctx.db
                    .query("files")
                    .withIndex('by_owner', q => q.eq('ownerID', args.ownerID.toString()))
                    .filter((q) => q.eq(q.field('isFavourite'), args.fav))
                : ctx.db
                    .query("files")
                    .withIndex('by_owner', q => q.eq('ownerID', args.ownerID.toString()));



        const files =  await baseQuery.collect()

        const filesWithUrl = await Promise.all(
            files.map(async (file) =>({
                ...file,
                url:await ctx.storage.getUrl(file.fileID) 
            }))
            
        )

        return args.query !== undefined ? filesWithUrl.filter((file) => file.name.toLocaleLowerCase().includes(args.query!.toLocaleLowerCase())) : filesWithUrl

    },
    
});

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const favouriteToggle = mutation({
    args: {
        _id:v.id('files'),
        isFavorite: v.boolean()
    },
    async handler(ctx , args){

        await ctx.db.patch(args._id,{isFavourite: !args.isFavorite});

    }
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