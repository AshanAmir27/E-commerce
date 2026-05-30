import customersService from "../services/customers.service.js";

const getCustomers = async (req, res) => {
  try {
    const customers = await customersService.getCustomers();

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getCustomers,
};