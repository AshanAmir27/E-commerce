"use client";

import { useState } from "react";
import { createCustomer } from "@/app/actions/customer.actions";

export default function CreateCustomerModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-500"
      >
        + Create Customer
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-xl shadow-black/40">
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Create Customer
            </h2>

            <form action={createCustomer} className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400">Username</label>
                <input
                  name="username"
                  placeholder="Enter username"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">Email</label>
                <input
                  name="email"
                  placeholder="Enter email"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">City</label>
                <input
                  name="city"
                  placeholder="Enter city"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-md border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:bg-zinc-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="cursor-pointer rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}