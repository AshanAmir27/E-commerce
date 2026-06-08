"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-grey-100">
      <h2 className="text-2xl font-bold text-red-600">
        Opps,Something went wrong!
      </h2>

      <p className="text-gray-700">
        {error.message}
      </p>

      <button
        onClick={() => reset()}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}