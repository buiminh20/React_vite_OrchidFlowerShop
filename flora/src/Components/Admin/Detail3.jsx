import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Button, Modal, Form, ListGroup, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { IoRibbonSharp } from "react-icons/io5";
import { OrbitProgress } from 'react-loading-indicators';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

export default function Detail() {
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [ratingFb, setRatingFb] = useState(0);
  const [comment, setComment] = useState('');
  const [editIndex, setEditIndex] = useState(null); // Track index for editing
  const [showModal, setShowModal] = useState(false);
  const [user] = useAuthState(auth);

  const baseURL = `https://670a1768af1a3998baa302a2.mockapi.io/LAB-REACT`;

  const fetchOrchidData = async () => {
    try {
      const response = await fetch(`${baseURL}/${id}`);
      const data = await response.json();
      setOrchid(data);
      setFeedback(data.feedback || []);
    } catch (error) {
      console.error('Error fetching orchid data:', error);
    }
  };

  useEffect(() => {
    fetchOrchidData();
  }, [id]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please log in to submit feedback.');

    // Check if user has already submitted feedback
    const userFeedback = feedback.find(fb => fb.userEmail === user.email);
    if (userFeedback) {
      return alert('You have already submitted feedback.');
    }

    const newFeedback = {
      ratingFb,
      comment,
      userEmail: user.email,
      displayName: user.displayName || 'Anonymous', // Using display name or fallback
      date: new Date().toLocaleDateString(),
    };

    const updatedFeedback = [...feedback, newFeedback];

    try {
      await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...orchid, feedback: updatedFeedback }),
      });
      setFeedback(updatedFeedback);
      setRatingFb(0);
      setComment('');
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const handleEditFeedback = (index) => {
    const fb = feedback[index];
    setRatingFb(fb.ratingFb);
    setComment(fb.comment);
    setEditIndex(index);
  };

  const handleDeleteFeedback = async (index) => {
    const updatedFeedback = feedback.filter((_, i) => i !== index);

    try {
      await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...orchid, feedback: updatedFeedback }),
      });
      setFeedback(updatedFeedback);
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  if (!orchid) {
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <OrbitProgress variant="track-disc" color="blue" size="medium" />
      </div>
    );
  }

  return (
    <>
      <Card key={orchid.id}>
        <Card.Body>
          <Row>
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <img
                src={`http://localhost:5173/${orchid.image}`}
                alt={orchid.name}
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <h3>{orchid.name} {orchid.isSpecial && <IoRibbonSharp className="text-danger ms-2" style={{ fontSize: '15px' }} />}</h3>
              <p><b>Category:</b> {orchid.category}</p>
              <p><b>Origin:</b> {orchid.origin}</p>
              <p><b>Color:</b> {orchid.color}</p>
              <p><b>Rating:</b> {Array.from({ length: orchid.rating }).map((_, i) => <FaStar key={i} className="text-warning" />)}</p>
              <Button variant="info" onClick={handleShowModal}>Video detail</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{orchid.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
          <iframe width="100%" height="315" src={orchid.video} title="YouTube video player" allowFullScreen></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4">
        <h4>Feedback from customers</h4>
        {user ? (
          <Form onSubmit={handleFeedbackSubmit} className="mb-3 p-3">
            <InputGroup className="mb-2">
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="me-2 mb-0">Rating:</Form.Label>
                {[1, 2, 3, 4, 5].map((num) => (
                  <FaStar
                    key={num}
                    className={num <= ratingFb ? "text-warning" : "text-secondary"}
                    onClick={() => setRatingFb(num)}
                    style={{ cursor: 'pointer', fontSize: '1.25rem' }}
                  />
                ))}
              </Form.Group>
            </InputGroup>
            <Form.Group className="mb-2">
              <Form.Control
                as="textarea"
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              {editIndex !== null ? 'Update' : 'Post'}
            </Button>
          </Form>
        ) : (
          <p>Please log in to leave feedback.</p>
        )}

        <ListGroup variant="flush" className="mt-3">
          {feedback.map((fb, index) => (
            <ListGroup.Item key={index} className="d-flex mb-2 p-3">
              <div>
                <b>{user?.email} - {fb.date}</b><br />
                {[...Array(fb.ratingFb)].map((_, idx) => <FaStar key={idx} className="text-warning" />)}
                <p>{fb.comment}</p>
                
                {/* Check user email to match with feedback */}
                {fb.userEmail === user?.email && (
                  <>
                    <Button
                      variant="link"
                      onClick={() => { if (confirm('Do you want to edit?')) handleEditFeedback(index) }}
                      className="text-warning"
                    >
                      <MdEditSquare />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => { if (confirm('Do you want to delete?')) handleDeleteFeedback(index) }}
                      className="text-danger"
                    >
                      <FaTrashAlt />
                    </Button>
                  </>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}
