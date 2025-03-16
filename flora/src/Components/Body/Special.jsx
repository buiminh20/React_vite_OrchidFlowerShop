import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import { IoRibbonSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { flowerData } from '../../Data/OrchidData';

export default function Special() {
  return (
    <>
     <Container>
        <Row xs={1} sm={2} md={3} lg={4}> 
          {flowerData.filter(orchid => orchid.isSpecial).map((orchid) => ( 
            <Col key={orchid.id}> 
              <Card className="mb-3"> 
                <Card.Img 
                  variant="top" 
                  src={orchid.image} 
                  alt={orchid.name} 
                  style={{ height: '214px', objectFit: 'cover' }} 
                />
                <Card.Body>
                  <Card.Text>
                    <b>{orchid.name}</b>
                    
                  </Card.Text>
                  <Card.Text>Origin: {orchid.origin}</Card.Text>
                  <Card.Text>
                    Rating: {Array.from({ length: orchid.rating }).map((_, index) => (
                      <FaStar className='text-warning' key={index} />
                    ))}
                  </Card.Text>
                  <Link to={`/detail/${orchid.id}`}>
                    <Button variant="primary">Detail</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}
