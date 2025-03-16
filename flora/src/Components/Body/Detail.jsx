import React, { useState } from 'react';
import { Col, Row, Card, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { flowerData } from '../../Data/OrchidData';
import Image from 'react-bootstrap/Image';
import { FaStar } from "react-icons/fa";
import { IoRibbonSharp } from "react-icons/io5";

export default function Detail() {
  const { id } = useParams();
  const orchid = flowerData.find((orchid) => orchid.id === id);
  const [showModal, setShowModal] = useState(false);

  if (!orchid) {
    return <div>Orchid not found!</div>;
  }

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Card key={orchid.id}>
        <Card.Body>
          <Row>
            <Col xs={6}>
              <Image
                src={`http://localhost:5173/${orchid.image}`}
                alt={orchid.name}
                style={{ width: '400px', height: '400px' }}
              />
            </Col>
            <Col xs={6}>
              <h3>{orchid.name}{orchid.isSpecial && (
                      <IoRibbonSharp 
                        className="text-danger ml-2"
                        style={{ fontSize: '20px', verticalAlign: 'middle' }} 
                      />)}</h3>
              <p><b>Category:</b> {orchid.category}</p>
              <p><b>Origin:</b> {orchid.origin}</p>
              <p><b>Color:</b> {orchid.color}</p>
              <p><b>Rating:</b> {Array.from({ length: orchid.rating }).map((_, index) => (
                  <FaStar key={index} className="text-warning" /> // Render star icons
                ))}
              </p>
              <Button variant="info" onClick={handleShowModal}>
                Video detail
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>


{/* popup */}
<Modal show={showModal} onHide={handleCloseModal} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>{orchid.name}</Modal.Title> 
  </Modal.Header>
  <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}> 
    <iframe 
      width="100%" // Make the iframe take up the full width of its container
      height="315" 
      src={orchid.video}
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"   

      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen
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