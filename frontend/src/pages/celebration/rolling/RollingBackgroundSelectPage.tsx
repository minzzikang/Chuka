import Navbar from "@common/navbar";
import Header from "@common/header";
import { useNavigate } from "react-router-dom";
import RollingSelect from "@/components/celebration/Rolling/RollingSelect";
import { useState, useEffect } from "react";

const RollingBackgroundSelectPage = () => {
  const navigate = useNavigate();

  const [regData, setRegData] = useState({
    shape: "",
    background_color: "",
    background_image: "",
  });

  useEffect(() => {
    console.log(regData)
  }, [regData]);

  const goNext = () => {
    navigate("/celebrate/rolling-write", { state: { regData } });
  };

  const handleRegData = (data: any) => {
    setRegData(data);
  };

  return (
    <>
      <Header children="배경 선택하기" label="다음" onClick={goNext} />
      <RollingSelect onDataChange={handleRegData} />
      <Navbar current="celebration" />
    </>
  );
};

export default RollingBackgroundSelectPage;
