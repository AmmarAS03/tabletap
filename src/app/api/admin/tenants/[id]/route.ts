import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const id = parseInt(params.id);
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: { tenant: true },
      });
  
      if (!user || user.role !== 'tenant') {
        return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
      }
  
      return NextResponse.json({
        tenant: {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.tenant?.address || '',
        },
      });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const { isActive } = await req.json();

  try {
    const updatedTenant = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { isActive },
    });

    return NextResponse.json({ tenant: updatedTenant });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update tenant status" },
      { status: 500 }
    );
  }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const id = parseInt(params.id);
    const { name, address } = await req.json();
  
    try {
      // Update user name
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { name },
      });
  
      // Upsert address in Tenant table
      const updatedTenant = await prisma.tenant.upsert({
        where: { userId: id },
        update: { address },
        create: { userId: id, address },
      });
  
      return NextResponse.json({ message: 'Tenant updated successfully' });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
  }
