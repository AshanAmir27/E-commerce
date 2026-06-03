import UserNav from "@/components/ui/UserNav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserNav />
      <main>{children}</main>
    </>
  );
}