const baseURL = process.env.API_URL;

export const fetchMetricsAPI = async () => {
    const res = await fetch(`${baseURL}/analytics/metrics`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    console.log(data);
    if(!res.ok){
        throw new Error(data.message ||"Failed to fetch metrics")
    }
    return data;
}



export const fetchRevenueByTimeAPI = async (period: string) => {
    const res = await fetch(`${baseURL}/analytics/revenue?period=${period}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    if(!res.ok){
        throw new Error (data.message ||"Failed to fetch revenue by time")
    }
    return data;
}

export const fetchCustomersByCityAPI = async () => {
    const res = await fetch(`${baseURL}/analytics/customers-by-city`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message ||"Failed to fetch customers by city")
    }
    return data;
}