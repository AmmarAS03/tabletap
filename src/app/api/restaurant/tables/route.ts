// src/app/api/restaurant/tables/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { cookies } from 'next/headers';

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

// GET /api/restaurant/tables
export async function GET() {
  const user = await getUserFromCookie();
  if (!user || user.role !== 'tenant') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tables = await prisma.table.findMany({
      where: { tenantId: user.id },
      orderBy: { number: 'asc' },
      select: { id: true, number: true },
    });
    return NextResponse.json({ tables });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch tables' }, { status: 500 });
  }
}

// POST /api/restaurant/tables
export async function POST(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user || user.role !== 'tenant') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { count } = await req.json();
  if (!count || isNaN(count) || count < 1) {
    return NextResponse.json({ error: 'Invalid count' }, { status: 400 });
  }

  try {
    const existing = await prisma.table.findMany({
      where: { tenantId: user.id },
      orderBy: { number: 'asc' },
    });

    const start = existing.length + 1;
    const newTables = Array.from({ length: count }, (_, i) => ({
      number: start + i,
      tenantId: user.id,
    }));

    await prisma.table.createMany({ data: newTables });

    return NextResponse.json({ message: 'Tables created' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create tables' }, { status: 500 });
  }
}
