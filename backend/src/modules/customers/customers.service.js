import userRepository from "./customer.repository.js";
import {
  createCustomerDTO,
  CustomerResponseDTO,
} from "./customer.dto.js";

export const getCustomers = async ({
  search,
  page,
  limit,
}) => {
  if (page < 1) {
    throw new Error("Page must be greater than 0");
  }

  if (limit < 1) {
    throw new Error("Limit must be greater than 0");
  }

  const offset = (page - 1) * limit;

  return await userRepository.getCustomers({
    search,
    limit,
    offset,
  });
};

export const createCustomer = async (payload) => {
  if (!payload.username) {
    throw new Error("Username is required");
  }

  if (!payload.email) {
    throw new Error("Email is required");
  }

  const customerData = createCustomerDTO(payload);

  const result = await userRepository.createCustomer(customerData);

  return CustomerResponseDTO(result);
};

export const getCustomerById = async (id) => {
  if (!id) {
    throw new Error("Customer id is required");
  }

  const customer = await userRepository.getCustomerById(id);

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};