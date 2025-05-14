import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

async function getUserFromCookie() {
  const cookie = (await cookies()).get("user")?.value;
  if (!cookie) return null;
  try {
    return JSON.parse(cookie);
  } catch {
    return null;
  }
}

export async function GET() {
  const user = await getUserFromCookie();
  if (!user || user.role !== "tenant") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const menus = await prisma.menu.findMany({
      where: { tenantId: user.id },
      include: { items: true },
      orderBy: { id: "asc" },
    });
    return NextResponse.json({ menus });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to load menus" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user || user.role !== "tenant") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title } = await req.json();
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    const newMenu = await prisma.menu.create({
      data: {
        title,
        tenant: { connect: { userId: user.id } },
      },
    });
    return NextResponse.json({ menu: newMenu });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create menu" },
      { status: 500 }
    );
  }
}
