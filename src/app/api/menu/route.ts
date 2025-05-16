import { PrismaClient } from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const tableId = req.nextUrl.searchParams.get("table");

  if (!tableId || isNaN(Number(tableId))) {
    return NextResponse.json({ error: "Invalid table ID" }, { status: 400 });
  }

  console.log("TABLE ID: ", tableId)
  try {
    const table = await prisma.table.findUnique({
      where: { id: Number(tableId) },
      include: { tenant: true },
    });

    if (!table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    const menus = await prisma.menu.findMany({
      where: { tenantId: table.tenantId },
      include: { items: true },
    });

    return NextResponse.json({ menus });
  } catch (err) {
    console.error("Menu load error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
