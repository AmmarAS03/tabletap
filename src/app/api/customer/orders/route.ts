import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const tableId = Number(url.searchParams.get('table'));

  if (!tableId) {
    return NextResponse.json({ error: 'Missing table ID' }, { status: 400 });
  }

  const { items } = await req.json();

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'No items provided' }, { status: 400 });
  }

  try {
    // Create the order
    const order = await prisma.order.create({
      data: {
        tableId,
        items: {
          create: items.map((item: { menuItemId: number; quantity: number }) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json({ orderId: order.id, message: 'Order placed successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
