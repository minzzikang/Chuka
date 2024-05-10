import { useEffect, useState } from "react";
import RecentTermHeader from "./RecentTermHeader";
import RecentTermList from "./RecentTermList";
import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
`;
export const EmptyText = styled.div`
  font-size: 1em;
  color: ${colors.gray};
`;

const index = () => {
  const storage = localStorage.getItem("recentTerm");
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    storage && setTerms(JSON.parse(storage));
  }, [storage]);

  // 최근 검색어 모두 삭제
  const resetTerms = () => {
    localStorage.removeItem("recentTerm");
    setTerms([]);
  };

  return (
    <Container>
      <RecentTermHeader resetTerms={resetTerms} />
      {terms.length === 0 ? (
        <EmptyText>검색 내역이 없습니다.</EmptyText>
      ) : (
        <RecentTermList terms={terms} />
      )}
    </Container>
  );
};

export default index;
