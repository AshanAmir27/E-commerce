const baseURL = process.env.API_URL;

export const fetchCustomers = async ({ page = 1, limit = 10}) => {

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    const res = await fetch(`${baseURL}/customers/get-customer-by-filter?${params}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: { revalidate: 10 }
        // cache: 'no-store'
    });

    if(!res.ok){
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch customers")
    }

    return res.json();

}