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
  /* background-size: contain; */
  width: 120px;
  height: 120px;
  border-radius: 30px;
  position: relative;
`;

export const Wrap = styled.div`
  width: 100%;
  height: 44px;
  margin-top: 10px;
  background-color: ${colors.white};
  opacity: 0.7;
  display: flex;
  position: absolute;
  top: 50%;
  border-bottom-right-radius: 1.25em;
  border-bottom-left-radius: 1.25em;
`;

export const WrapOverlay = styled.div`
  display: flex;
  width: 100%;
  /* height: 44px;
  opacity: 0.7; */
  gap: 5px;
  /* justify-content: center; */
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
  font-size: 0.7em;
  font-weight: 500;
`

export type EventCardType = {
    title:string
    createTime:string
    date: string
    thumbNailUrl: string
    eventUrl: string
}