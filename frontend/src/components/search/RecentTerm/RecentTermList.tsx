import RecentTermListItem from "./RecentTermListItem";
import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RecentTermList = (props: { terms: string[] }) => {
  const { terms } = props;

  return (
    <Container>
      {terms &&
        terms.map((item: string, index: number) => (
          <RecentTermListItem key={index} value={item} />
        ))}
    </Container>
  );
};

export default RecentTermList;
