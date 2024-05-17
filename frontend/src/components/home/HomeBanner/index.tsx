import styled from "styled-components";
import { useState } from "react";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 80px;
`;

export const Carousel = styled.div`
  width: 100%;
  height: -100%;
  overflow: hidden;
  position: fixed;
  bottom: 0px;
`;

export const CarouselBox = styled.div<{ translateX: number }>`
  display: flex;
  transform: ${({ translateX }) => `translateX(-${translateX}%)`};
  transition: transform 0.5s ease;
`;

export const CarouselItem = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`;

export const Button = styled.button`
  position: absolute;
  top: 30px;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1;

  &:first-of-type {
    left: 0px;
  }

  &:last-of-type {
    right: 0px;
  }
`;

interface CarouselProps {
  images: string[];
}

const index = (props: CarouselProps) => {
  const { images } = props;
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevImage = () => {
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container>
      <Carousel>
        <Button onClick={prevImage}>
          {"<"}
        </Button>
        <CarouselBox translateX={currentIdx * 100}>
          {images.map((img, index) => (
            <CarouselItem key={index} src={img} />
          ))}
        </CarouselBox>
      </Carousel>
      <Button onClick={nextImage}>{">"}</Button>
    </Container>
  );
};

export default index;
