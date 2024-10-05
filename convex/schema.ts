import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  files: defineTable({
     name: v.string(),
     orgID : v.string(),
     fileID: v.id("_storage"),
    }).index("by_owner",["orgID"],),
});