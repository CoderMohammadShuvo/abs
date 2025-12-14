import { Sidebar } from './_components/Sidebar'
import { Header } from './_components/Header'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <Header />
            <main className="lg:pl-64 pt-16 min-h-screen">
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
