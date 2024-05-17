import styled from "styled-components";

export type DrawerType = {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  name: string;
};

export const Container = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  z-index: 301;
`;

export const BlackBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 300;
  width: 100vw;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
`;

export const Wrap = styled.div`
  position: relative;
  z-index: 301;
  display: flex;
  flex-direction: column;

  background-color: #fff;
  width: 50%;
  overflow-y: scroll;
  transition: transform 0.5s ease-in-out;
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
    width: 0; /* Remove scrollbar space */
    height: 0;
    background: transparent; /* Optional: just make scrollbar invisible */
    -webkit-appearance: none;
  }
`;

export const ModalName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  padding-top: 40px;
  height: 40px;
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5em;
  img {
    cursor: pointer;
    width: 12px;
    height: 12px;
  }
`;
