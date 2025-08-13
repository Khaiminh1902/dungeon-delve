/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  action,
  internalMutation,
  internalQuery,
  query,
} from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import bcrypt from "bcryptjs";
import { internal } from "./_generated/api";

const CHARACTERS: Record<string, string[]> = {
  Zephyr: ["Axe", "Battle Armor"],
  Korrath: ["War Hammer", "Shield"],
  Vex: ["Mystical Staff", "Ancient Tome"],
  Thane: ["Cosmic Blade", "Fire Gauntlets"],
};

export const signupAction = action({
  args: {
    username: v.string(),
    password: v.string(),
    character: v.string(),
  },
  handler: async (
    ctx,
    args
  ): Promise<{ userId: Id<"users">; token: string }> => {
    const username = args.username.trim();
    if (username.length < 3)
      throw new Error("Username must be at least 3 characters");
    if (args.password.length < 6)
      throw new Error("Password must be at least 6 characters");

    const existing = await ctx.runQuery(internal.users.getUserByUsername, {
      username,
    });
    if (existing) throw new Error("Username already taken");

    const passwordHash = await bcrypt.hash(args.password, 10);
    const weapons = CHARACTERS[args.character] ?? [];

    const userId = await ctx.runMutation(internal.users.createUser, {
      username,
      passwordHash,
      character: args.character,
      weapons,
    });

    const { token } = await ctx.runMutation(internal.users.createSession, {
      userId,
    });
    return { userId, token };
  },
});

export const loginAction = action({
  args: { username: v.string(), password: v.string() },
  handler: async (
    ctx,
    args
  ): Promise<{ userId: Id<"users">; token: string }> => {
    const user = await ctx.runQuery(internal.users.getUserByUsername, {
      username: args.username.trim(),
    });
    if (!user) throw new Error("Invalid username or password");

    const ok = await bcrypt.compare(args.password, (user as any).passwordHash);
    if (!ok) throw new Error("Invalid username or password");

    const { token } = await ctx.runMutation(internal.users.createSession, {
      userId: (user as any)._id,
    });
    return { userId: (user as any)._id, token };
  },
});

export const getUserByUsername = internalQuery({
  args: { username: v.string() },
  handler: async (ctx, { username }): Promise<any> => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", username))
      .unique();
    return user;
  },
});

export const createUser = internalMutation({
  args: {
    username: v.string(),
    passwordHash: v.string(),
    character: v.string(),
    weapons: v.array(v.string()),
  },
  handler: async (
    ctx,
    { username, passwordHash, character, weapons }
  ): Promise<Id<"users">> => {
    const userId = await ctx.db.insert("users", {
      username,
      passwordHash,
      character,
      class: character,
      weapons,
      createdAt: Date.now(),
    });
    return userId;
  },
});

export const createSession = internalMutation({
  args: { userId: v.id("users") },
  handler: async (
    ctx,
    { userId }
  ): Promise<{ sessionId: Id<"sessions">; token: string }> => {
    const token = randomToken(32);
    const sessionId = await ctx.db.insert("sessions", {
      userId,
      token,
      createdAt: Date.now(),
    });
    return { sessionId, token };
  },
});

export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId);
    if (!user) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safe } = user as any;
    return { ...safe, _id: user._id } as any;
  },
});

function randomToken(length: number) {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}
