import Navbar from "@common/navbar";
import RollingSelect from "@/components/celebration/Rolling/RollingSelect";
import { useState, useEffect } from "react";

const RollingBackgroundSelectPage = () => {
  const [regData, setRegData] = useState({
    shape: "",
    background_color: "",
    background_image: "",
  });

  useEffect(() => {
    // api 연결 로직 추가 예정
  }, [regData]);

  const handleData = (data: any) => {
    setRegData(data)
  };

  return (
    <>
      <RollingSelect onUpdateData={handleData} />
      <Navbar current="celebration" />
    </>
  );
};

export default RollingBackgroundSelectPage;
