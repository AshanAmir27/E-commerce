const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCustomers = async () => {
    const res = await fetch(`${baseURL}/customers`,{
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