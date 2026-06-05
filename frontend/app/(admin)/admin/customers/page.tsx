import { createCustomer } from "@/app/actions/customer.actions";

export default function AddCustomerPage() {
  return (
    <form action={createCustomer} className="flex flex-col gap-2 ">
      <input
        name="username"
        placeholder="Username"
        className="border border-gray-300 rounded-md p-2 text-black"
      />

      <input
        name="email"
        placeholder="Email"
        className="border border-gray-300 rounded-md p-2 text-black"
      />

      <input
        name="city"
        placeholder="City"
        className="border border-gray-300 rounded-md p-2 text-black"
      />

      <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
        Create Customer
      </button>
    </form>
  );
}