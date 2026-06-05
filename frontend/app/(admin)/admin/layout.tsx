import AdminSidebar from "@/components/ui/AdminSidebar"
import AdminTopbar from "@/components/ui/AdminTopbar"

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <aside className="w-[220px] h-full shrink-0 border-r bg-white">
            <AdminSidebar />
            </aside>
            
            <div className="flex min-w-0 flex-1 flex-col">
                <AdminTopbar />
                <div className="flex-1 overflow-y-auto p-6">
                    <main>{children}</main>
                </div>
            </div>
        </div>
    )
}