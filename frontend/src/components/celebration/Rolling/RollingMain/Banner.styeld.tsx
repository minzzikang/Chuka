import styled from "styled-components";
import { colors } from "@styles/theme";

export const Wrap = styled.div`
  position: relative;
  width: 100%;
`;

export const Title = styled.p`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
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

export const Dday = styled.p`
  position: absolute;
  top: 5px;
  right: 10px;
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
  right: 10px;
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
  max-height: 120px;
`;
