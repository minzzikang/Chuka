
import styled from "styled-components";
import { colors } from "@styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  height: 250px;
  background-color: ${colors.mainPink};
  color: ${colors.white};
  position: absolute;
  bottom: 25%;
  right: 0;
  transition: right 0.3s ease-in-out;
  writing-mode: vertical-lr;
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