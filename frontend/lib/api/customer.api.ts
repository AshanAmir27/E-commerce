const baseURL = process.env.API_URL;

export const fetchCustomers = async ({ page = 1, limit = 10, search = "" }) => {

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    if (search) {
        params.set("search", search)
    }

    const res = await fetch(`${baseURL}/customers/get-customer-by-filter?${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: { revalidate: 10 }
        // cache: 'no-store'
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch customers")
    }

    return res.json();

}

export const fetchTotalCutomers = async () => {

    const res = await fetch(`${baseURL}/analytics/total-customers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch total number of customers")
    }

    return res.json()
}

export const fetchTotalProducts = async () => {
    const res = await fetch(`${baseURL}/analytics/total-products`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(!res.ok){
        const error = await res.json();
        throw new Error (error.messae) || "Failed to fetch total products"
    }

    return res.json();
}