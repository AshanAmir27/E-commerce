import userRepository from "../repositories/user.repository.js";
import { createCustomerDTO, CustomerResponseDTO } from "../dto/customer.dto.js";

const getCustomers = async () => {
  // you can add logic here later (filters, validation, etc.)
  const customers = await userRepository.getCustomers();
  return customers;
};

const createCustomer = async (payload) => {
  
  if(!payload.username || !payload.email){
    throw new Error("Username and email are required")
  }

  const customerData = createCustomerDTO(payload);

  const result = await userRepository.createCustomer(customerData);

  return CustomerResponseDTO(result)
}

export default {
  getCustomers,
  createCustomer
};