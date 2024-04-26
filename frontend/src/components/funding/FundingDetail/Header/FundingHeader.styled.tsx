import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Logo = styled.img`
  width: 49.66px;
  height: 51px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.div`
  color: ${colors.mainPink};
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;