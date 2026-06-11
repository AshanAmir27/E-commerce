export const createCustomerDTO = (payload) => ({
  username: payload.username,
  email: payload.email,
  city: payload.city,
});

export const CustomerResponseDTO = (customer) => ({
  customer_id: customer.customer_id,
  username: customer.username,
  email: customer.email,
  city: customer.city,
});