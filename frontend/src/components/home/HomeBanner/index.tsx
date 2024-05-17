import styled from "styled-components";
import { useEffect, useState } from "react";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Carousel = styled.div`
  width: 100%;
  overflow: hidden;
  height: 90px;
  position: relative;
`;

export const CarouselBox = styled.div<{ translateX: number }>`
  display: flex;
  transform: ${({ translateX }) => `translateX(-${translateX}%)`};
  transition: transform 0.5s ease;
`;

export const CarouselItem = styled.img`
  width: 100%;
  flex-shrink: 0;
`;

export const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1;

  &:first-of-type {
    left: 10px;
  }

  &:last-of-type {
    right: 10px;
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
        <Button />
        <CarouselBox translateX={currentIdx * 100}>
          {images.map(({ img, index }) => (
            <CarouselItem key={index} src={img} />
          ))}
        </CarouselBox>
      </Carousel>
      <Button />
    </Container>
  );
};

export default index;
