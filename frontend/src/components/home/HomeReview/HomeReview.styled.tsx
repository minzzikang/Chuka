import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ReviewBoxContainer = styled.div<{ id: any }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.id % 2 === 0 ? "flex-start" : "flex-end")};
`;

export const ReviewWrap = styled.div`
  width: 250px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 5px;
`;

export const Title = styled.div`
  font-size: 1.4em;
  font-weight: 700;
  margin: auto auto;
  margin-bottom: 10px;
`;

export const Desc = styled.span`
    font-size: 1em;
    color: ${colors.gray};
    margin: auto auto;
    margin-bottom: 10px;
`

export const Name = styled.div`
  font-size: 1.2em;
  font-weight: 500;
  color: #000;
`;

export const Comment = styled.div`
  font-size: 0.8em;
  color: #000;
`;

export const Button = styled.button`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  color: white;
  background-color: ${colors.mainPink};
  margin-top: 20px;
  margin-bottom: 180px;
`;

export const Highlight = styled(Desc)`
  color: ${colors.mainPink};
`;