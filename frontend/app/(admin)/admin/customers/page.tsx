import { createCustomer } from "@/app/actions/customer.actions";

export default function AddCustomerPage() {
  return (
    <form action={createCustomer}>
      <input
        name="username"
        placeholder="Username"
      />

      <input
        name="email"
        placeholder="Email"
      />

      <input
        name="city"
        placeholder="City"
      />

      <button type="submit">
        Create Customer
      </button>
    </form>
  );
}