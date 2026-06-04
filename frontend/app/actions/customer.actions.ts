"use server";

const baseURL = process.env.API_URL;

export async function createCustomer(formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const city = formData.get("city");

  const response = await fetch(`${baseURL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      city,
    }),
  });


  if (!response.ok) {
    throw new Error("Failed to create customer");
  }

  const data = await response.json();
  console.log(data)
}