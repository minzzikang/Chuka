import styled from "styled-components";
import { colors } from "@/styles/theme";

export const Container = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Goocneaeum";
`;

export const IntroWrap = styled.div`
  width: 100%;
  height: 300px;
  background-image: url("/img/img_chuka_intro.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight: 800;
`;

export const SubTitle = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`;

export const Text = styled.div`
  font-size: 1em;
`;
export const Highlight = styled(Text)`
  color: ${colors.mainPink};
`;

export const InfoWrap = styled.div`
  width: 300px;
  height: 100px;
`;

export const ChukaInfoWrap = styled.div`
  width: 100%;
  height: 100px;
  background-image: url("/img/img_chuka_info.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  gap: 5px;
`;

export const AnimationWrap = styled.div`
  position: relative;
  margin-top: 10px;
  cursor: pointer;
`;

export const Promotion = styled.img`
  position: absolute;
  bottom: 0px;
  right: 60px;
`;

export const TextWrap = styled.div`
  margin-right: 20px;
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
