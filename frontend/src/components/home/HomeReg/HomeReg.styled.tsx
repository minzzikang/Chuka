import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  width: 100%;
  height: 300px;
  background-color: #ffff;
  border-radius: 10%;
  /* opacity: 0.8; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  font-weight: 600;
`;

export const TitleWrap = styled.div`
  margin-top: 20px;
  font-family: "Goocneaeum";
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
`;

export const Text = styled.div`
  font-size: 1em;
  font-family: "Goocneaeum";
`;

export const Hightlight = styled.div`
  color: ${colors.mainPink};
`;

export const Button = styled.button`
  width: 104px;
  height: 35.1px;
  background-color: ${colors.mainPink};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
