import { colors } from "@/styles/theme";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";


export const Wrapper = styled.div`
  margin-top: 20px;
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
`

export const Header = styled.span`
  color: ${colors.black};
  font-weight: 700;
  flex-grow: 1;
  text-align: center;
`;

export const Icon = styled(IoIosArrowBack)`
  font-size: 24px;
  cursor: pointer;
`;