import UserNav from "@/components/ui/UserNav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserNav />
      <main className="flex-1 overflow-auto p-6 bg-gray-100 ">
        {children}
      </main>
    </>
  );
}