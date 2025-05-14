import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

type UserCookie = {
  id: number;
  role: 'admin' | 'tenant' | 'customer';
};

async function getUserFromCookie(): Promise<UserCookie | null> {
  const cookie = (await cookies()).get("user")?.value;
  if (!cookie) return null;
  try {
    return JSON.parse(cookie);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user || user.role !== 'tenant') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, price, menuId } = await req.json();

  if (!name || !price || !menuId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const newItem = await prisma.menuItem.create({
      data: {
        name,
        price: parseFloat(price),
        menu: { connect: { id: menuId } },
      },
    });
    return NextResponse.json({ item: newItem });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}