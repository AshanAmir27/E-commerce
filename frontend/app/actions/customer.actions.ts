"use server";

import { revalidatePath } from "next/cache";
import { customerSchema } from "@/lib/validation/customer";

const baseURL = process.env.API_URL;

export async function createCustomer(
  prevState: any,
  formData: FormData
) {
  const rawData = {
    username: formData.get("username"),
    email: formData.get("email"),
    city: formData.get("city"),
  };

  const validated = customerSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      success: false,
    };
  }

  const response = await fetch(`${baseURL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validated.data),
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Failed to create customer",
    };
  }

  revalidatePath("/admin/customers");

  return {
    success: true,
    errors: {},
  };
}