import { colors } from "@/styles/theme";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

export const Wrapper = styled.div`
  /* margin-top: 15px; */
  /* margin-top: 10px; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  color: ${colors.black};
  font-weight: 700;
  font-size: 14px;
  margin-right: 10px;
  cursor: pointer;
`;

export const Header = styled.div`
  color: ${colors.black};
  font-weight: 700;
  flex-grow: 1;
  text-align: center;
  margin-top: 20px;
`;

export const Icon = styled(IoIosArrowBack)`
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 24px;
  margin-top: 7px;
  cursor: pointer;
`;

export const Icon2 = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 16px;
  font-size: 24px;
`;
