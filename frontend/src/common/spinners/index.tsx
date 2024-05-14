import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";
import { FadeLoader } from "react-spinners";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PinkText = styled.div`
  font-size: 1.2em;
  color: ${colors.mainPink};
  font-weight: 600;
`;

const index = (props: {
  text: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
//   let [loading, setLoading] = useState(false);
  const { text, loading } = props;
  // useEffect(() => {
  //   setLoading(true)
  // })
  return (
    <Container>
      <FadeLoader
        color={colors.mainPink}
        speedMultiplier={0.7}
        loading={loading}
      />
      {loading && <PinkText>{text}</PinkText>}
    </Container>
  );
};

export default index;
