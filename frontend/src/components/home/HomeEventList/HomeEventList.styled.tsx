import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

`;

export const Title = styled.div`
font-size: 1.5em;
font-weight: 700;
margin: auto auto;
`

export const FilterWrap = styled.div`
display: flex;
gap: 10px;
justify-content: flex-end ;

`

export const FilterText = styled.div<{$active:boolean}>`
  font-size: 1em;
  color: ${(props) => props.$active ? colors.mainPink: colors.black};
`

export const SeeMoreBtn = styled.button`
  width: 100%;
  height: 49px;
  border: 1px solid ${colors.mainPink};
  border-radius: 5px;
  color: ${colors.mainPink};
`;