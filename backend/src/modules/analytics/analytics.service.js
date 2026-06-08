import * as analyticsRepository from './analytics.repository.js';

export const getTotalCustomers = async () => {
    const repoResult = await analyticsRepository.getTotalCustomers();
    return {
        totalCustomer: repoResult.total_customers
    };
}

export const getTotalProducts = async () => {
    const repoResult = await analyticsRepository.getTotalProducts();
    return {
        totalProducts : repoResult.total_products
    };
}