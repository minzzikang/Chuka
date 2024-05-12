import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Text = styled.div`
  font-size: 1em;
  color: ${colors.mainPink};
`;

export const Intro = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;

  width: 100%;
  height: 33px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 1em;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none; /* 웹킷 기반 브라우저에서 스크롤바 숨기기 */
  }
  -ms-overflow-style: none; /* IE, Edge 브라우저에서 스크롤바 숨기기 */
  scrollbar-width: none;
`;
