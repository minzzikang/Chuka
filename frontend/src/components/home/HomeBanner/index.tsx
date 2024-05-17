import styled from "styled-components";
import { useEffect, useState } from "react";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 5em;
`;

export const Carousel = styled.div`
  width: 100%;
  overflow: hidden;
  height: 90px;
  position: fixed;
  bottom: 58px;
`;

export const CarouselBox = styled.div`
  display: flex;
  height: 100%;
`;

export const CarouselItem = styled.div`
  background-position: center;
  width: 412px;
  height: auto;
  background-size: contain;
  background-repeat: no-repeat;
  flex: none;
`;


const index = () => {
  const [items, setItems] = useState([
    { url: "/img/img_main_banner.png" },
    { url: "/img/img_main_banner2.png" },
    { url: "/img/img_main_banner3.png" },
    { url: "/img/img_main_banner4.png" },
    { url: "/img/img_main_banner5.png" },
  ]);

  const [currentIdx, setCurrentIdx] = useState(0);

  const nextImage = () => {
    setCurrentIdx((current) => (current+1) % items.length)
  }

  const prevImage = () => {
    setCurrentIdx((current) => (current - 1 + items.length) % )
  }

  return (
    <>
      <Container>
        <Carousel>
          <CarouselBox
            style={{
              transform: `translateX(${-100 * currentIdx}%)`,
              transition,
            }}
          >
            {slides.map(({ url, id }) => {
              return (
                <CarouselItem
                  key={id}
                  style={{ backgroundImage: `url(${url})` }}
                />
              );
            })}
          </CarouselBox>
        </Carousel>
      </Container>
    </>
  );
};

export default index;
