import customersService from "../services/customers.service.js";

const getCustomers = async (req, res) => {
  try {
    const customers = await customersService.getCustomers();

    res.status(200).json({
      code:200,
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

const createCustomer = async (req,res) => {
  try {
    const data = await customersService.createCustomer(req.body);
    res.status(201).json({
      code: 201,
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message:error.message
    })
    
  }
}

export default {
  getCustomers,
  createCustomer
};