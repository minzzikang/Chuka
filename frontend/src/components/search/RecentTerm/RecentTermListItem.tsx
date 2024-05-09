import { keywordState } from "@stores/search";
import { useSetRecoilState } from "recoil";
import { colors } from "@/styles/theme";
import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray};
  font-size: 1em;
  padding: 9px 13px;
  border-radius: 20px;
  margin-right: 12px;
  margin-bottom: 10px;
  white-space: pre;
  cursor: pointer;
`;

const RecentTermListItem = (props: { value: string }) => {
  const setKeyword = useSetRecoilState(keywordState);

  const { value } = props;

  return (
    <Wrap key={value} onClick={() => setKeyword(value)}>
      {value}
    </Wrap>
  );
};

export default RecentTermListItem;
