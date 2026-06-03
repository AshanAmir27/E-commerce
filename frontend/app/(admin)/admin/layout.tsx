import AdminSidebar from "@/components/ui/AdminSidebar"

export default function AdminLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
        <>
            <AdminSidebar />
            <main>{children}</main>
        </>
    )
}