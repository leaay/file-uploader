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
        typeQuery: v.optional(v.string()),
        fav: v.optional(v.boolean()),
        
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
            .filter((q) =>
                args.typeQuery ? 
                q.and(q.eq(q.field('isFavourite'), args.fav),q.eq(q.field('fileType'),args.typeQuery)) : 
                q.eq(q.field('isFavourite'), args.fav)
            )
        : ctx.db
            .query("files")
            .withIndex('by_owner', q => q.eq('ownerID', args.ownerID.toString()))
            .filter((q) =>
                args.typeQuery
                  ? q.eq(q.field('fileType'), args.typeQuery)
                  : true
            )
            

        

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

// export const getFile = query({
//     args: {
//       ownerID: v.string(),
//       query: v.optional(v.string()),
//       fav: v.optional(v.boolean()),
//       paginationOpts: paginationOptsValidator, // Validate pagination opts
//     },
  
//     async handler(ctx, args) {
//       const isUserLoggedIn = await ctx.auth.getUserIdentity();
  
//       // If the user is not logged in, return empty data
//       if (!isUserLoggedIn) {
//         return {
//           data: [],
//           isDone: true,
//           continueCursor: null,
//           page: [], // Empty array for the current page
//         };
//       }
  
//       // Deny access if the ownerID is 'skip'
//       if (args.ownerID === 'skip') {
//         throw new ConvexError('ACCESS DENIED');
//       }
  
//       console.log(args.query?.toLocaleLowerCase());
  
//       // Build the base query based on the 'fav' and 'ownerID' filters
//       const baseQuery = args.fav
//         ? ctx.db
//             .query("files")
//             .withIndex('by_owner', q => q.eq('ownerID', args.ownerID.toString()))
//             .filter((q) => q.eq(q.field('isFavourite'), args.fav))
//         : ctx.db
//             .query("files")
//             .withIndex('by_owner', q => q.eq('ownerID', args.ownerID.toString()));
  
//       // Apply pagination with the provided options
//       const result = await baseQuery.paginate(args.paginationOpts);
  
//       // Get the list of files for the current page
//       const files = result.page;
  
//       // Fetch URLs for each file asynchronously
//       const filesWithUrl = await Promise.all(
//         files.map(async (file) => ({
//           ...file,
//           url: await ctx.storage.getUrl(file.fileID),
//         }))
//       );
  
//       // Filter the files if the query is provided
//       const filteredFiles = args.query
//         ? filesWithUrl.filter((file) =>
//             file.name.toLocaleLowerCase().includes(args.query!.toLocaleLowerCase())
//           )
//         : filesWithUrl;
  
//       // Return the correct structure for pagination
//       return {
//         data: filteredFiles, // The current set of files for this page
//         isDone: result.isDone, // Whether there are more records
//         continueCursor: result.continueCursor, // Cursor to fetch more records
//         page: filteredFiles, // The current page of files
//       };
//     },
//   });


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