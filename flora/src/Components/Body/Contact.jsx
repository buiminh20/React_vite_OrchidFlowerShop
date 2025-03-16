import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Card } from 'react-bootstrap';


export default function Contact() {
  return (
    <>
    <Card>
      <Card.Title style={{color:'blue'}}>Contact us here</Card.Title>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label><b>Email address</b></Form.Label>
        <Form.Control type="email" placeholder="name@gmail.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label><b>Your comment</b></Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button variant='info'>Submit</Button>
    </Form>
    </Card>
    </>
  )
}
