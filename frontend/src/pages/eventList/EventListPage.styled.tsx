import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 0 10px;
  padding-bottom: 80px;
`;

export const Img = styled.img`
  width: 49.66px;
  height: 51px;
  display: flex;
  align-self: flex-start;
`;

export const Title = styled.div`
  font-size: 1.5em;
  font-weight: 700;
  margin: auto auto;
`;

export const FilterWrap = styled.div`
  display: flex;
  gap: 10px;
  align-self: flex-end;
`;

export const FilterText = styled.div<{ $active: boolean }>`
  font-size: 1em;
  color: ${(props) => (props.$active ? colors.mainPink : colors.black)};
`;

export const SeeMoreBtn = styled.button`
  width: 100%;
  height: 49px;
  border: 1px solid ${colors.mainPink};
  border-radius: 5px;
  color: ${colors.mainPink};
`;

export const DataWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const PagiWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
