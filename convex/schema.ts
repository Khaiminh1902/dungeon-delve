import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    passwordHash: v.string(),
    race: v.optional(v.string()),
    class: v.optional(v.string()),
    weapons: v.optional(v.array(v.string())),
    createdAt: v.number(),
  }).index("by_username", ["username"]),
  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    createdAt: v.number(),
  }).index("by_token", ["token"]),
});
