import styled from "styled-components";

export const Container = styled.div<{$isLoading:boolean}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-bottom: 80px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
    -webkit-appearance: none;
  }
  opacity: ${(props) => (props.$isLoading) ? '0.4' : "none" };
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
