import { colors } from "@/styles/theme";
import styled from "styled-components";
import Default from "/img/img_default_banner.png";

interface ContainerProps {
  imgSrc?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  margin-top: 20px;
  width: 90%;
  height: 150px;
  border-radius: 1em;
  background-image: url(${(props) => props.imgSrc || Default});
  padding: 10px;
  justify-content: space-between;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Dday = styled.p`
  font-size: 2em;
  font-weight: 600;
  text-shadow:
    -1px 0px ${colors.white},
    0px 1px ${colors.white},
    1px 0px ${colors.white},
    0px -1px ${colors.white};
`;

export const Title = styled.p`
  margin-top: 1em;
  font-size: 1.8em;
  font-weight: 600;
  text-shadow:
    -1px 0px ${colors.white},
    0px 1px ${colors.white},
    1px 0px ${colors.white},
    0px -1px ${colors.white};
`;

export const Date = styled.p`
  color: ${colors.gray};
  font-size: 0.9em;
  text-shadow:
    -0.8px 0px ${colors.white},
    0px 0.8px ${colors.white},
    0.8px 0px ${colors.white},
    0px -0.8px ${colors.white};
`;

export const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;
