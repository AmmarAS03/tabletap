import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '5')
    const skip = (page - 1) * limit
  
    const [tenants, total] = await Promise.all([
      prisma.user.findMany({
        where: { role: 'tenant' },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where: { role: 'tenant' } }),
    ])
  
    return NextResponse.json({ tenants, total })
  }
  

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json()
  
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
  
    const hashedPassword = await bcrypt.hash(password, 10)
  
    try {
      const newTenant = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'tenant',
          isActive: true,
        },
      })
  
      return NextResponse.json({ tenant: newTenant })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ error: 'Failed to create tenant' }, { status: 500 })
    }
  }