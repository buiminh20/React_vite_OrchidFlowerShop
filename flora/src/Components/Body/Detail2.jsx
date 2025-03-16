import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { FaStar } from "react-icons/fa";
import { IoRibbonSharp } from "react-icons/io5";
import { OrbitProgress } from 'react-loading-indicators';

export default function Detail() {
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  const baseURL = `https://670a1768af1a3998baa302a2.mockapi.io/LAB-REACT`; 

  const fetchOrchidData = async () => {
    try {
      const response = await fetch(`${baseURL}/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrchid(data); 
    } catch (error) {
      console.error('Error fetching orchid data:', error);
    }
  };

  useEffect(() => {
    fetchOrchidData(); 
  }, [id]); 

  if (!orchid) {
    return <div className='d-flex justify-content-center align-items-center'>
      <OrbitProgress variant="track-disc" color="blue" size="medium" /></div>; 
  }

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);


  
  return (
    <>
      <Card key={orchid.id}>
        <Card.Body>
          <Row>
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <Image
                src={`http://localhost:5173/${orchid.image}`}
                alt={orchid.name}
                fluid // Makes the image responsive
                style={{ maxHeight: '400px', objectFit: 'cover' }} // Optional: keep the aspect ratio
              />
            </Col>
            <Col xs={12} md={6}>
              <h3>{orchid.name} {orchid.isSpecial && (
                <IoRibbonSharp 
                  className="text-danger ms-2"
                  style={{ fontSize: '15px', verticalAlign: 'middle' }} 
                />
              )}</h3>
              <p><b>Category:</b> {orchid.category}</p>
              <p><b>Origin:</b> {orchid.origin}</p>
              <p><b>Color:</b> {orchid.color}</p>
              <p><b>Rating:</b> {Array.from({ length: orchid.rating }).map((_, index) => (
                <FaStar key={index} className="text-warning" /> // Render star icons
              ))}</p>
              <Button variant="info" onClick={handleShowModal}>
                Video detail
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Popup for video */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{orchid.name}</Modal.Title> 
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}> 
          <iframe 
            width="100%" 
            height="315" 
            src={orchid.video}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"   
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
