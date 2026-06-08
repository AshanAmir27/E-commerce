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
  const pageHref = (targetPage: number) =>
    href.includes("page=") ? `${href}${targetPage}` : `${href}?page=${targetPage}`;

  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      {page > 1 && (
        <Link
          href={pageHref(page - 1)}
          className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-blue-400 transition hover:bg-zinc-700"
        >
          Previous
        </Link>
      )}

      <span className="text-sm text-zinc-400">
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <Link
          href={pageHref(page + 1)}
          className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-blue-400 transition hover:bg-zinc-700"
        >
          Next
        </Link>
      )}
    </div>
  );
}