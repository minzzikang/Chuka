import Navbar from "@common/navbar";
import Header from "@common/header";
import { useNavigate } from "react-router-dom";
import RollingSelect from "@/components/celebration/Rolling/RollingSelect";

const RollingBackgroundSelectPage = () => {
  const navigate = useNavigate();
  const goNext = () => [navigate("/celebrate/rolling-write")];

  return (
    <>
      <Header children="배경 선택하기" label="다음" onClick={goNext} />
      <RollingSelect />
      <Navbar current="celebration" />
    </>
  );
};

export default RollingBackgroundSelectPage;
