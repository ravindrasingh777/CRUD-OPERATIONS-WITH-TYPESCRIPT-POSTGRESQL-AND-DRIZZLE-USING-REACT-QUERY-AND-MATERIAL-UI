"use server";
import { db } from "./db";
import { UserTable } from "../db/schema";
import { NextRequest } from "next/server";
import { asc, eq } from "drizzle-orm";

export const getUser = async () => {
  try {
    const data = await db.select().from(UserTable).orderBy(asc(UserTable.name));
    return data;
  } catch (error) {
    console.error("DB error:", error);
    throw error;
  }
};

export const EditUser = async (data) => {
  try {
    const updatedUser = await db
      .update(UserTable)
      .set({ ...data })
      .where(eq(UserTable.userId, data.userId))
      .returning();
    return { updatedUser };
  } catch (error) {}
};

export const DeleteUser = async (Id) => {
  try {
    await db.delete(UserTable).where(eq(UserTable.userId, Id));
  } catch (error) {
    return {};
  }
};
