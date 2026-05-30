export const createCustomerDTO = (data) => {
    if(!data.city){
        throw new Error("City is misisng")
    }
    return {
        username: data.username,
        email: data.email,
        signup_date: data.signup_date,
        city: data.city
    };
};

export const CustomerResponseDTO = (data) => {
    return {
        customer_id: data.customer_id,
        username: data.username,
        email: data.email,
        signup_date: data.signup_date,
        city: data.city
    };
};