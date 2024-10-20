import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(v.literal("image/jpeg"),v.literal("image/png"),v.literal("image/gif"),v.literal("image/svg+xml"),v.literal("application/pdf"))

export default defineSchema({
  files: defineTable({
     name: v.string(),
     ownerID : v.string(),
     fileID: v.id("_storage"),
     fileType: fileTypes,
     isFavourite : v.boolean()
    })
    .index("by_owner",["ownerID"],)
    .searchIndex("queryName",{searchField:'name'}),
});