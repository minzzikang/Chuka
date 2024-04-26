import * as h from "@common/header/Header.styled";

type HeaderType = {
  children: string;
  onClick?: () => void;
  label?: string;
};

const index = ({ children, onClick, label }: HeaderType) => {
  const handleBack = () => {
    console.log("뒤로가기");
    window.history.back();
  };


  return (
    <h.Wrapper>
      <h.Icon onClick={handleBack} />
      <h.Header>{children}</h.Header>
      {onClick && label && (
        <h.TextButton onClick={onClick}>{label}</h.TextButton>
      )}
    </h.Wrapper>
  );
};

export default index;
