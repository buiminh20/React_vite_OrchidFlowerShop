import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import { IoRibbonSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators';
import Search from './Search';
const Special = () => {
    const [specialOrchids, setSpecialOrchids] = useState([]); // State to store special orchids
    const baseURL = `https://670a1768af1a3998baa302a2.mockapi.io/LAB-REACT`; // Change to your base URL
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null); 
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

    const fetchSpecialOrchids = async () => {
      try {
        const response = await fetch(`${baseURL}?sortBy=id&order=desc`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
       
        const specialOrchidData = data.filter((orchid) => orchid.isSpecial === true);
        setSpecialOrchids(specialOrchidData);
      } catch (error) {
        console.error('Error fetching special orchid data:', error);
      }
    };

    useEffect(() => {
      fetchSpecialOrchids(); 
    }, []);

    return (
      <Container>
       
        {loading ? (
          <div className='d-flex justify-content-center align-items-center'>
            <OrbitProgress color="blue" size="medium" speedPlus={'3'} />
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4}>
            {specialOrchids.map((orchid) => (
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
                      {/* Uncomment if you want to display a special ribbon */}
                      {/* {orchid.isSpecial && (
                        <IoRibbonSharp 
                          className="text-danger ml-2"
                          style={{ fontSize: '20px', verticalAlign: 'middle' }} 
                        />
                      )} */}
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
        )}
      </Container>
    );
};

export default Special;
