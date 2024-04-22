import "./customer.css"
import { Link } from "react-router-dom";
export default function Customer(customer) {
    console.log(customer);
    return (
      <div className="customer">
          <div className="customerInf">
              <Link to={`/${customer.customer.email}`} style={{ color: 'black', textDecoration: 'none' }} className="Link"> 
                <div className="customerName">{customer.customer.name}</div>
                <hr/>
                <div className="customerInfo"><b>Email: </b>{customer.customer.email}</div>
                <div className="customerInfo"><b>Address: </b>{customer.customer.address}</div>
                <div className="customerInfo"><b>Phone No.: </b>{customer.customer.phone}</div>
                <div className="customerInfo"><b>Frequency of Reminder: </b>{customer.customer.frequency}</div>
             </Link>
          </div>
      </div>
    )
  }