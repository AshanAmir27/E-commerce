export type Customer = {
    customer_id: number,
    username: string,
    email: string,
    city: string
};

export type Pagination = {
    searchParams: Promise<{page?:string}>
}