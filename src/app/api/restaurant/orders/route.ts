import { NextResponse } from "next/server";
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
    const tenant = await prisma.tenant.findUnique({
      where: { userId: user.id },
      include: {
        tables: {
          include: {
            orders: {
              include: {
                items: {
                  include: {
                    menuItem: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const tables = tenant?.tables || [];

    const orders = tables.flatMap((table) =>
      table.orders.map((order) => ({
        id: order.id,
        status: order.status,
        createdAt: order.createdAt,
        tableNumber: table.number,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.menuItem.name,
          quantity: item.quantity,
        })),
      }))
    );

    return NextResponse.json({ orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
