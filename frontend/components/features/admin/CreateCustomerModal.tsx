"use client";

import { useState, useActionState } from "react";
import { createCustomer } from "@/app/actions/customer.actions";

const initialState = {
  success: false,
  errors: {},
};

export default function CreateCustomerModal() {
  const [open, setOpen] = useState(false);

// state : Contains latest server response.
// Initially:
// {
//   success: false,
//   errors: {}
// }

// After validation error:

// {
//   success: false,
//   errors: {
//     email: ["Invalid email"]
//   }
// }
// After success:
// {
//   success: true,
//   errors: {}
// }
// ----------------------------
// pending

// Boolean.

// While request is running:

// pending === true

// After completion:

// pending === false
  const [state, formAction, pending] = useActionState(
    createCustomer,
    initialState
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-md bg-gradient-to-r from-[#BFB5FD] via-[#B6A7FF] to-[#AA9DF8] px-4 py-2 text-black shadow-sm"
      >
        + Create Customer
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Create Customer
            </h2>

            <form action={formAction} className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400">
                  Username
                </label>

                <input
                  name="username"
                  placeholder="Enter username"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-zinc-100"
                />

                {state?.errors?.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.username[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-zinc-400">
                  Email
                </label>

                <input
                  name="email"
                  placeholder="Enter email"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-zinc-100"
                />

                {state?.errors?.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-zinc-400">
                  City
                </label>

                <input
                  name="city"
                  placeholder="Enter city"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-zinc-100"
                />

                {state?.errors?.city && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.city[0]}
                  </p>
                )}
              </div>

              {state?.success && (
                <p className="text-sm text-green-500">
                  Customer created successfully.
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-md border border-zinc-700 px-4 py-2 text-zinc-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={pending}
                  className="cursor-pointer rounded-md bg-green-600 px-4 py-2 text-white disabled:opacity-50"
                >
                  {pending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}