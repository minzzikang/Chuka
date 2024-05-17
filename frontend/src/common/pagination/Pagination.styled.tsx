import styled from "styled-components";
import { colors } from "@/styles/theme";

export type PaginationBtnType = {
  children: number;
  key: number;
  $active: boolean;
  onClick: () => void;
  "aria-current": "page" | null;
};

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const Wrap = styled.div`
  display: flex;
  gap: 5px;
`;

export const PagiBtn = styled.div<PaginationBtnType>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.$active ? colors.mainPink : "none")};
  border-radius: 0.3em;
  color: ${(props) => (props.$active ? colors.white : colors.darkGray)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.img`
  width: 36px;
  height: 36px;
`;
