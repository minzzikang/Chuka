import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto auto;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 100%;
  gap: 30px;
  position: relative;
  /* opacity: 0.4; */
`;

export const Img = styled.img`
  position: fixed;
  bottom: 60px;
  width: 100%;
  max-width: 412px;
  height: auto;

  @media (min-width: 768px) {
    // 화면 너비가 768px 이상인 경우 적용
    bottom: 60px;
    max-width: 376px;
  }
`;
