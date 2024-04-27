import Navbar from "@common/navbar";
import RollingWrite from "@/components/celebration/Rolling/RollingWrite";
import { useState, useEffect } from "react";

const RollingWritePage = () => {
  const [regData, setRegData] = useState({
    shape: "",
    background_color: "",
    background_image: "",
    font: "",
    font_color: "",
    content: "",
  });

  useEffect(() => {
    // api 연결 로직 추가 예정
  }, [regData]);
  

  const handleData = (data: any) => {
    setRegData(data)
  };

  return (
    <>
      <RollingWrite onUpdateData={handleData} />
      <Navbar current="celebration" />
    </>
  );
};

export default RollingWritePage;
