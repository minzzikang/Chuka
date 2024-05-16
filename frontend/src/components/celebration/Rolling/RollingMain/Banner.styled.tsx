import styled from "styled-components";
import { colors } from "@styles/theme";

export const Wrap = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

export const Title = styled.p`
  font-size: 20px;
  margin: 5px;
  color: ${colors.black};
  text-shadow:
    -0.5px 0px ${colors.white},
    0px 0.5px ${colors.white},
    0.5px 0px ${colors.white},
    0px -0.5px ${colors.white};
`;

export const Name = styled.p`
  position: absolute;
  top: 90px;
  left: 10px;
  font-size: 1em;
  color: ${colors.black};
  text-shadow:
    -0.5px 0px ${colors.white},
    0px 0.5px ${colors.white},
    0.5px 0px ${colors.white},
    0px -0.5px ${colors.white};
`;

export const Dday = styled.div`
  position: relative;
  margin-right: 5px;
  font-size: 28px;
  color: ${colors.black};
  text-shadow:
    -0.5px 0px ${colors.white},
    0px 0.5px ${colors.white},
    0.5px 0px ${colors.white},
    0px -0.5px ${colors.white};
`;

export const EventDay = styled.p`
  position: absolute;
  top: 40px;
  right: 5px;
  font-size: 0.9em;
  color: ${colors.black};
  text-shadow:
    -0.5px 0px ${colors.white},
    0px 0.5px ${colors.white},
    0.5px 0px ${colors.white},
    0px -0.5px ${colors.white};
`;

export const Banner = styled.img`
  opacity: 0.5;
  width: 100%;
  height: auto;
  max-height: 120px;
  object-fit: cover;
`;

export const Icon = styled.div`
  position: absolute;
  top: 60px;
  right: 10px;
  background-color: ${colors.mainPink};
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 50%;
  color: ${colors.white};
  justify-content: center;
  align-items: center;
  display: flex;

  img {
    width: 20px;
    height: 20px;
  }
`;
