import { PrismaClient } from '../src/generated/prisma/index.js'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const users = [
    {
      name: 'Admin',
      email: 'admin@example.com',
      password: 'Admin123',
      role: 'admin',
    },
    {
      name: 'Restaurant',
      email: 'restaurant@example.com',
      password: 'Password123',
      role: 'tenant',
    },
    {
      name: 'User',
      email: 'user@example.com',
      password: 'User123',
      role: 'customer',
    },
  ]

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role as any,
      },
    })
  }

  console.log('✅ Users seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding users:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
