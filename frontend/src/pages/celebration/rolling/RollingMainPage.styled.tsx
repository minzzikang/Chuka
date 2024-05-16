import styled from "styled-components";
import { colors } from "@styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 430px;
  height: 100%;
  position: relative;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  z-index: 201;
  width: 30px;
  height: 180px;
  background-color: ${colors.mainPink};
  color: ${colors.white};
  position: absolute;
  bottom: 40%;
  right: 0;
  writing-mode: vertical-lr;
`;

export const shareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  z-index: 203;
  width: 300px;
  height: 40px;
  background-color: ${colors.mainPink};
  color: ${colors.white};
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translate(-50%, 0);
`;

export interface EventInfo {
  userId: string;
  nickname: string;
  eventId: number;
  pageUrl: string;
  type: string;
  theme: string;
  title: string;
  date: string;
  createTime: string;
  bannerUrl: string;
  bannerThumbnailUrl: string;
}
