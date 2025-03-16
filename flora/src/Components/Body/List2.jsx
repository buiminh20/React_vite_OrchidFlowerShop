import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import { IoRibbonSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators'; 
import Search from './Search';

const List = () => {
  
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
 const [flowerData, setFlowerData] = useState([]); 
  const baseURL = `https://670a1768af1a3998baa302a2.mockapi.io/LAB-REACT`;
  const fetchFlowerData = async () => {
    try {
      const response = await fetch(`${baseURL}?sortBy=id&order=desc`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFlowerData(data); 
    } catch (error) {
      console.error('Error fetching flower data:', error);
    }
  };

  useEffect(() => {
    fetchFlowerData(); 
  }, []);

  // Filter flower data based on searchText and selectedCategory
  const filteredData = flowerData.filter((orchid) => {
    const matchesSearchText = orchid.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory ? orchid.category === selectedCategory : true; // Filter based on selectedCategory
    return matchesSearchText && matchesCategory;
  });

  return (
    <Container>
      <Search 
        onSearchChange={setSearchText} 
        onCategoryFilterChange={setSelectedCategory}  // Pass selectedCategory change handler
      />
      {loading ? (
        <div className='d-flex justify-content-center align-items-center'>
          <OrbitProgress color="blue" size="medium" speedPlus={'3'} />
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4}>
          {filteredData.map((orchid) => (
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
                    {orchid.isSpecial && (
                      <IoRibbonSharp 
                        className="text-danger ml-2"
                        style={{ fontSize: '20px', verticalAlign: 'middle' }} 
                      />
                    )}
                  </Card.Text>
                  <Card.Text>Origin: {orchid.origin}</Card.Text>
                  <Card.Text>Category: {orchid.category}</Card.Text>
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

export default List;
