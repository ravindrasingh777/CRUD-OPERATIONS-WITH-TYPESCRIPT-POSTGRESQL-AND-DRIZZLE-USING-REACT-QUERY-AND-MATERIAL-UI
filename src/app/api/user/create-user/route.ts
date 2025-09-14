import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import { UserTable } from "../../../../../db/schema";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await db.insert(UserTable).values({
      name: data.name,
      email: data.email,
      gender: data.gender,
      age: data.age,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
