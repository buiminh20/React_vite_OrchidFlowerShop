import Carousel from 'react-bootstrap/Carousel';
import React from 'react';

export default function CustomCarousel() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block h-50px w-100"
            src="assets\img\gold-wallpaper.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Dendrobium Orchid</h3>
            <p>Dendrobium orchids enchant with their cascading clusters of vibrant blooms</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block h-20 w-100"
            src="assets\img\yello-wallpaper.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Yellow Phalaenopsis Orchid</h3>
            <p>The yellow phalaenopsis orchid radiates sunshine and joy, graceful form</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block h-50 w-100"
            src="assets\img\wallpap.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Pink Phalaenopsis Orchid</h3>
            <p>The pink phalaenopsis orchid captivates with its delicate, butterfly-like blooms.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel><br/>
    </>
  );
}
