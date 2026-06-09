const baseURL = process.env.API_URL;

export const fetchTotalCutomers = async () => {

    const res = await fetch(`${baseURL}/analytics/total-customers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch total customers")
    }

    return data;
}

export const fetchTotalProducts = async () => {
    const res = await fetch(`${baseURL}/analytics/total-products`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message ||"Failed to fetch total products")
    }

    return data;
}

export const fetchTotalOrdersAPI = async () => {
    const res = await fetch(`${baseURL}/analytics/total-orders`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    if(!res.ok){
        throw new Error (data.message ||"Failed to fetch total orders")
    }
    return data;
}

export const fetchRevenueTrendAPI = async () => {
    const res = await fetch(`${baseURL}/analytics/revenue-trend`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    if(!res.ok){
        throw new Error (data.message ||"Failed to fetch revenue trend")
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