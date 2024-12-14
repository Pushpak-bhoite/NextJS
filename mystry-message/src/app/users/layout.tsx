import Navbar from '@/components/Navbar';


export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

