import { getCustomers } from "../../services/customer.service";

export default async function CustomerPage(){
    const customers = await getCustomers();
    
    return(
        <div>
            <h1>Customers</h1>
            {customers.map((customer)=>(
                <div key={customer.customer_id}>
                    <br />
                    <p>{customer.username}</p>
                    <p>{customer.email}</p>
                    <p>{customer.city}</p>
                    <br />
                </div>
            ))}
        </div>
    )
}