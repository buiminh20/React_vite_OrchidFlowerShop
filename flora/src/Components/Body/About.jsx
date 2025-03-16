import React, { useState, useEffect, Suspense } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { OrbitProgress } from 'react-loading-indicators';

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          {loading ? (
            <div className='d-flex justify-content-center align-items-center'>
              <OrbitProgress color="blue" size="medium" /></div>
          ) : (
            <Row>
              <Col xs={12} md={6}>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6589.52848751886!2d106.80255136255113!3d10.87565469446937!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2zTmjDoCBWxINuIGjDs2EgU2luaCB2acOqbiBUUC5IQ00!5e0!3m2!1svi!2s!4v1728437471780!5m2!1svi!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

              </Col>

              {/* Text section */}
              <Col xs={12} md={6}>
                <Card.Title>
                  <h5>Find us</h5>
                </Card.Title>
                <Card.Text>
                  <br />
                  <b>Address:</b> Lưu Hữu Phước Tân Lập, Đông Hoà, Dĩ An, Bình Dương <br /> <br />
                  <b>Hotline:</b> 03270811807 <br /><br />
                  <b>Email:</b> abc@gmail.com
                </Card.Text>
              </Col>
            </Row>)}
        </Card.Body>
      </Card>
    </>
  );
}
