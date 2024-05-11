import styled from "styled-components";
import { colors } from "@/styles/theme";
import { useNavigate } from "react-router";


export const Container = styled.div<{ $thumbNailUrl: string }>`
  background-image: ${(props) =>
    props.$thumbNailUrl
      ? `url('${props.$thumbNailUrl}')`
      : "url('/icon/apple-touch-icon.png')"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 1em;
  border: 2px solid ${colors.inputGray};
  cursor: pointer;
  width: 150px;
  height: 150px;
  margin-top: 10px;
  z-index: 1000;
  `;

export const Wrap = styled.div`
  width: 100%;
  height: 44px;
  margin-top: 10px;
  /* background-color: ${colors.mainPink}; */
  /* color: ${colors.white}; */
  background-color: #fff;
  opacity: 0.7;
  display: flex;
  position: absolute;
  top: 50%;
`;

export const WrapOverlay = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  align-items: center;
`;

export const DescWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 6px;
  gap: 4px;
  /* align-items: center; */
`;
export const Title = styled.div`
  font-size: 1em;
  font-weight: 700;
`;

export const Date = styled.div`
  font-size: 0.6em;
  font-weight: 500;
`

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  z-index: 1001;
  position: absolute;
  top: 7px;
  right: 7px;
`