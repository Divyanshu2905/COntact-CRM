import React, {useState,useContext,useEffect,createRef} from "react";
import Container from 'react-bootstrap/Container';
import { useLocation } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import { Context } from "../context/context";
import { axiosInstance } from "../config"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
let i=0;
let dateRef=createRef();
let detailRef=createRef();

const senderRef=createRef();
const subjectRef=createRef();
const textRef=createRef();

const nameRef=createRef();
const phoneRef=createRef();
const addressRef=createRef();
const FrequencyRef=createRef();
export default function Customerone() {
    const {user}=useContext(Context);
    const location=useLocation();
    const path = location.pathname.split("/")[1]; 
    const email=path;
    const [name,setName]=useState("");
    const [customer,setCustomer]=useState([]);
    const [CRM,setCRM]=useState([]);

    const [showcomm, setShowComm] = useState(false);
    const handleClosecomm = () => setShowComm(false);
    const handleShowcomm = () => setShowComm(true);
    const handleSubmitcomm =async(e)=>{
        e.preventDefault();
        let update=CRM;
        let time=dateRef.current.value;
        const details=detailRef.current.value;
        update.push({time,details});
        const res=await axiosInstance.put("/customers/"+user.user.uid,{
            email,
            CRM:update
        })
        handleClosecomm();
        window.location.reload();
    }

    const [showemail, setShowEmail] = useState(false);
    const handleCloseEmail = () => setShowEmail(false);
    const handleShowEmail = () => setShowEmail(true);
    const handleSubmitEmail =async(e)=>{
        e.preventDefault();
        const name=senderRef.current.value;
        const subject=subjectRef.current.value;
        const text=textRef.current.value;
        const res=await axiosInstance.post("/mail/"+user.user.uid,{
            email,
            name,
            subject,
            text
        })
        handleCloseEmail();
    }

    const [showupdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);
    const handleSubmitUpdate =async(e)=>{
        e.preventDefault();
        const name=nameRef.current.value;
        const address=addressRef.current.value;
        const phone=phoneRef.current.value;
        const frequency=FrequencyRef.current.value;
        const res=await axiosInstance.put("/customers/"+user.user.uid,{
            email,
            name,
            address,
            phone,
            frequency
        })
        handleCloseUpdate();
        window.location.reload(); 
    }

    const deleteCustomer = async(e)=>{
        e.preventDefault();
        const res=await axiosInstance.delete("/customers/"+user.user.uid+"/"+customer.email)
        console.log(res);
        window.location.replace("/"); 
    }

    
    useEffect(()=>{
        const fetchCustomers=async()=>{
                const res = await axiosInstance.get(`/customers/${user.user.uid}`,{
                    email:{email}
                  });
                  const customer = res.data.find(customer => customer.email === email);
                  if (customer) {
                    setCustomer(customer);
                    setCRM(customer.CRM || []);
                  } else {
                    console.warn(`Customer with email "${email}" not found.`);
                  } 
        }
        const fetchName=async()=>{
            const res2=await axiosInstance.get("/users/"+user.user.uid);
            setName(res2.data.name);
        }
        fetchCustomers();
        fetchName();
    },[]);
    return (
      <div className="customerone">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Hello {name}</Navbar.Brand>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={handleShowUpdate}>Update</Button>
            <Button variant="secondary" onClick={handleShowEmail}>Send Mail</Button>
            <Button variant="secondary" onClick={deleteCustomer}>Delete</Button>
        </ButtonGroup>
        </Container>

      </Navbar>
      <ListGroup>
        <ListGroup.Item><b>Name: </b>{customer.name}</ListGroup.Item>
        <ListGroup.Item><b>Email: </b>{customer.email}</ListGroup.Item>
        <ListGroup.Item><b>Address: </b>{customer.address}</ListGroup.Item>
        <ListGroup.Item><b>Phone Number: </b>{customer.phone}</ListGroup.Item>
        <ListGroup.Item><b>Frequency of Reminder: </b>{customer.frequency}</ListGroup.Item>
    </ListGroup>
    <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Contact History</Navbar.Brand>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={handleShowcomm}>Add Communication</Button>
        </ButtonGroup>
        </Container>
      </Navbar>
            <Accordion>
            {CRM.map((crm)=>(
                <Accordion.Item eventKey={i++}>
                    <Accordion.Header>Date: {crm.time}</Accordion.Header>
                    <Accordion.Body>
                    {crm.details}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
            </Accordion> 

            {/* Communication Modal */}
            <Modal show={showcomm} onHide={handleClosecomm}>
                <Modal.Header closeButton>
                <Modal.Title>Add Communication History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        autoFocus
                        ref={dateRef}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Details of Communication</Form.Label>
                    <Form.Control as="textarea" rows={3}  ref={detailRef}/>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClosecomm}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitcomm}>
                    Update
                </Button>
                </Modal.Footer>
            </Modal>

             {/* Email Modal */}
             <Modal show={showemail} onHide={handleCloseEmail}>
                <Modal.Header closeButton>
                <Modal.Title>Send Email To Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name of Sender</Form.Label>
                    <Form.Control
                        type="textarea"
                        autoFocus
                        rows={1}
                        ref={senderRef}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Subject</Form.Label>
                    <Form.Control as="textarea" rows={1}  ref={subjectRef}/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" rows={3}  ref={textRef}/>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEmail}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitEmail}>
                    Send Mail
                </Button>
                </Modal.Footer>
            </Modal>

            {/* Update Modal */}
            <Modal show={showupdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                <Modal.Title>Update Customer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="textarea"
                        autoFocus
                        rows={1}
                        defaultValue={customer.name}
                        ref={nameRef}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control as="textarea" rows={1} defaultValue={customer.phone} ref={phoneRef}/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Frequency of Reminder</Form.Label>
                    <Form.Control as="textarea" rows={1} defaultValue={customer.frequency} ref={FrequencyRef}/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue={customer.address}  ref={addressRef}/>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitUpdate}>
                    Update Customer
                </Button>
                </Modal.Footer>
            </Modal>
      </div>
    )
  }