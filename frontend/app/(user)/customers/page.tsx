import { getCustomers } from "../../../services/customer.service";
import { Customer } from "../../types/types";

export default async function CustomerPage(){
    const customers = await getCustomers();
    
    return(
        <div>
            <h1 className="text-2xl font-bold text-black">Customers</h1>
            {customers.map((customer: Customer)=>(
                <div key={customer.customer_id}>
                    <br />
                    <p style={{color: 'black'}}>{customer.username}</p>
                    <p style={{color: 'black'}}>{customer.email}</p>
                    <p style={{color: 'black'}}>{customer.city}</p>
                    <br />
                </div>
            ))}
        </div>
    )
}