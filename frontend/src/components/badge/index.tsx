import * as b from "./Badge.styled";

interface BadgeProps {
  result: string;
}

const index = (props: BadgeProps) => {
  const { result } = props;

  return (
    <>
      <b.Container $result={result}>
        {result === "ONGOING" ? "진행 중" : "진행 완료"}
      </b.Container>
    </>
  );
};

export default index;
