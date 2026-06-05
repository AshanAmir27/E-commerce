import Link from "next/link";

export default function Pagination({
  page,
  totalPages,
  href,
}: {
  page: number;
  totalPages: number;
  href: string;
}) {
  return (
    <div className="flex gap-2 mt-4 justify-center items-center">
      {page > 1 && (
        <Link href={`${href}?page=${page - 1}`} className="text-blue-500">
          Previous
        </Link>
      )}

      <span className="text-black">
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <Link href={`${href}?page=${page + 1}`} className="text-blue-500">
          Next
        </Link>
      )}
    </div>
  );
}