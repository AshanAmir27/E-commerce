import AdminSidebar from "@/components/ui/AdminSidebar"
import AdminTopbar from "@/components/ui/AdminTopbar"

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-[#05060F] overflow-hidden">
            <aside className="w-[220px] h-full shrink-0 border-r border-zinc-800 bg-zinc-900">
                <AdminSidebar />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <AdminTopbar />
                <div className="scrollbar-dark flex-1 overflow-y-auto bg-zinc-950 p-6">
                    <main>{children}</main>
                </div>
            </div>
        </div>
    )
}