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
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition cursor-pointer"
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
          <div className="relative bg-white w-full max-w-md rounded-xl shadow-xl p-6">
            
            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Create Customer
            </h2>

            {/* Form */}
            <form action={createCustomer} className="space-y-4">

              <div>
                <label className="text-sm text-gray-600">Username</label>
                <input
                  name="username"
                  placeholder="Enter username"
                  className="w-full mt-1 border rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  name="email"
                  placeholder="Enter email"
                  className="w-full mt-1 border rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">City</label>
                <input
                  name="city"
                  placeholder="Enter city"
                  className="w-full mt-1 border rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white cursor-pointer"
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