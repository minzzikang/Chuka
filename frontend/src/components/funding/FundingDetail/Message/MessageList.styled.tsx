import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  width: 100%;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Text = styled.div`
  font-size: 1em;
  color: ${colors.mainPink};
`;

export const SeeMoreBtn = styled.button`
  width: 100%;
  height: 49px;
  border: 1px solid ${colors.mainPink};
  border-radius: 5px;
  color: ${colors.mainPink};
`;

export const MsgNone = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;

  width: 100%;
  height: 33px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 1em;
`;
