import Navbar from "@common/navbar";
import RollingSelect from "@/components/celebration/Rolling/RollingRegInfo/RollingSelect";
import { useState, useEffect } from "react";

const RollingBackgroundSelectPage = () => {
  const [regData, setRegData] = useState({
    shape: "",
    background_color: "",
    background_image: "",
  });

  useEffect(() => {
    console.log(regData);
  }, [regData]);

  const handleData = (data: any) => {
    setRegData(data);
  };

  return (
    <>
      <RollingSelect onUpdateData={handleData} />
      <Navbar current="celebration" />
    </>
  );
};

export default RollingBackgroundSelectPage;
