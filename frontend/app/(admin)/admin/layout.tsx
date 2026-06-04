import AdminSidebar from "@/components/ui/AdminSidebar"
import AdminTopbar from "@/components/ui/AdminTopbar"
export default function AdminLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
        <>
            <AdminTopbar/>
            <AdminSidebar />
            <main>{children}</main>
        </>
    )
}