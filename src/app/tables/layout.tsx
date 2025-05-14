import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function TablesLayout({ children }: { children: React.ReactNode }) {
  const cookie = (await cookies()).get('user')?.value

  if (!cookie) redirect('/login')

  let user
  try {
    user = JSON.parse(cookie)
  } catch {
    redirect('/login')
  }

  if (user.role !== 'tenant') redirect('/login')

  return <>{children}</>
}
