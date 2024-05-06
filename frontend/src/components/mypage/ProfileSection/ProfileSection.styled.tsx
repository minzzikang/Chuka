import styled from "styled-components";
import { colors } from "@/styles/theme";


export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
`;

export const Profile = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 20px;
  border-radius: 100%;
`;

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Name = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.2em;
`;

export const Description = styled.div`
  font-weight: 400;
  font-size: 1em;
  color: ${colors.gray};
`;