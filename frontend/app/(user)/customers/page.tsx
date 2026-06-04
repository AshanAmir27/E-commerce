import { getCustomers } from "../../../services/customer.service";
import { Customer } from "../../types/types";

export default async function CustomerPage(){
    const customers = await getCustomers();
    
    return(
        <div>
            <h1>Customers</h1>
            {customers.map((customer: Customer)=>(
                <div key={customer.customer_id}>
                    <br />
                    <p style={{color: 'white'}}>{customer.username}</p>
                    <p>{customer.email}</p>
                    <p>{customer.city}</p>
                    <br />
                </div>
            ))}
        </div>
    )
}