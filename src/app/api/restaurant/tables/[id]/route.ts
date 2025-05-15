import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

async function getUserFromCookie() {
  const cookie = (await cookies()).get('user')?.value;
  if (!cookie) return null;
  try {
    return JSON.parse(cookie);
  } catch {
    return null;
  }
}

// DELETE /api/restaurant/tables/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const user = await getUserFromCookie();
  if (!user || user.role !== 'tenant') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tableId = parseInt(context.params.id);

  if (isNaN(tableId)) {
    return NextResponse.json({ error: 'Invalid table ID' }, { status: 400 });
  }

  try {
    const table = await prisma.table.findUnique({
      where: { id: tableId },
    });

    if (!table || table.tenantId !== user.id) {
      return NextResponse.json({ error: 'Table not found or not yours' }, { status: 404 });
    }

    await prisma.table.delete({ where: { id: tableId } });

    return NextResponse.json({ message: 'Table deleted' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete table' }, { status: 500 });
  }
}
