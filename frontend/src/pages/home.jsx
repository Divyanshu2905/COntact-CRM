import React, { useState,useEffect,useContext,createRef } from "react"
import { axiosInstance } from "../config"
import { Context } from "../context/context";
import Customer from "./customer";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
let i=0;
const emailRef = createRef();
const nameRef = createRef();
const phoneNumberRef = createRef();
const addressRef = createRef();
const frequencyRef = createRef();

export default function Home() {
    const [customers,setCustomers]=useState([]);
    const {user,dispatch}=useContext(Context);
    const [name,setName]=useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => {
        emailRef.current.value = '';
        nameRef.current.value = '';
        phoneNumberRef.current.value = '';
        addressRef.current.value = '';
        frequencyRef.current.value = '';
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const name = nameRef.current.value;
        const address=addressRef.current.value;
        const frequency=frequencyRef.current.value;
        const CRM=[];
        const phone=phoneNumberRef.current.value;
        const res=await axiosInstance.post("/customers/"+user.user.uid,{
            email,
            name,
            address,
            frequency,
            CRM,
            phone
        })
        handleClose();
        window.location.reload();
    };
    useEffect(()=>{
        const fetchCustomers=async()=>{
           const res=await axiosInstance.get("/customers/"+user.user.uid)
           setCustomers(res.data);
        }
        const fetchName=async()=>{
            const res2=await axiosInstance.get("/users/"+user.user.uid);
            setName(res2.data.name);
        }
        fetchCustomers();
        fetchName();
    },[]);
    const handleLogout=()=>{
        dispatch({type:"LOGOUT"});
    }
    return (
        <div className="home">
            <Navbar className="bg-body-tertiary">
                <Container>
                <Navbar.Brand href="#home">Hello {name}</Navbar.Brand>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={handleShow} style={{fontSize:"20px"}}>Add Customer</Button> 
                    <Button variant="secondary" onClick={handleLogout} style={{fontSize:"20px"}}>Logout</Button>
                </ButtonGroup>
                </Container>
            </Navbar>
            {/* <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}><span className="greeting" style={{fontSize:"40px", paddingLeft:"20px"}}></span>
            <span></span></div> */}

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                    ref={emailRef}
                />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Name</Form.Label>
                <Form.Control as="textarea" rows={1} ref={nameRef} />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control as="textarea" rows={1} ref={phoneNumberRef} />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" rows={1} ref={addressRef} />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Frequency of Reminder</Form.Label>
                <Form.Control as="textarea"  rows={1} ref={frequencyRef}/>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>

            <hr></hr>
            <div className="CustomersLayout">
                {customers.map((customer)=>(
                    <Customer customer={customer} key={i++}/>
                ))}
            </div>
        </div>
    )
}