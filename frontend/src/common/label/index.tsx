import { colors } from "@/styles/theme";
import styled from "styled-components";

type LabelType = {
  htmlFor: string
  children: string
};

const Label = styled.label`
  color: ${colors.mainPink};
  margin-bottom: 5px;
`;

const index = (props: LabelType) => {
  const { htmlFor, children } = props;
  return <Label htmlFor={htmlFor}>{children}</Label>;
};

export default index;
