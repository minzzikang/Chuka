import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  width: 150px;
  height: 230px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
	align-items: center;
  justify-content: center;
	border-radius: 5px;
	border-right: 1px solid ${colors.gray};
	gap: 10px;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
	padding-right: 10px;
  gap: 10px;
  font-size: 0.8em;
`;

export const Img = styled.img`
  width: 125px;
  height: 120px;
`;

export const Button = styled.button`
  width: 130px;
  height: 20px;
  background-color: ${colors.mainPink};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
	font-size: 0.7em;
	border-radius: 5px;
`;