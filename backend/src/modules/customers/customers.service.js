import userRepository from "./customer.repository.js";
import { createCustomerDTO, CustomerResponseDTO } from "./customer.dto.js";

export const getCustomers = async () => {
  // you can add logic here later (filters, validation, etc.)
  const customers = await userRepository.getCustomers();
  return customers;
};

export const createCustomer = async (payload) => {

  if (!payload.username || !payload.email) {
    throw new Error("Username and email are required")
  }

  const customerData = createCustomerDTO(payload);

  const result = await userRepository.createCustomer(customerData);

  return CustomerResponseDTO(result)
}

export const getCustomerById = async (id) => {
  if (!id) {
    throw new Error("Id is missing")
  }
  
  const result = await userRepository.getCustomerById(id);
  if (!result || result.length === 0) {
      throw new Error("Customer not found")
    }
  return result;
}

export const getCustomersByFilter = async ({ city, page, limit }) => {
  if (page < 1 || limit < 1) {
    throw new Error("Invalid pagination values");
  }

  const offset = (page - 1) * limit;

  return await userRepository.getCustomersByFilter({
    city,
    limit,
    offset
  });
};