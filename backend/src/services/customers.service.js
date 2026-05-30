import userRepository from "../repositories/user.repository.js";

const getCustomers = async () => {
  // you can add logic here later (filters, validation, etc.)
  const customers = await userRepository.getCustomers();
  return customers;
};

export default {
  getCustomers,
};