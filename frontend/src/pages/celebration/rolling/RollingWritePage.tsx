import Navbar from "@common/navbar";
import RollingWrite from "@/components/celebration/Rolling/RollingRegInfo/RollingWrite";
import { useState, useEffect } from "react";

const RollingWritePage = () => {
  const [regData, setRegData] = useState({
    shape: "",
    background_color: "",
    background_image: "",
    background_image_thumbnail: "",
    font: "",
    font_color: "",
    content: "",
  });

  useEffect(() => {}, [regData]);

  const handleData = (data: any) => {
    setRegData(data);
  };

  return (
    <>
      <RollingWrite onUpdateData={handleData} />
      <Navbar current="celebration" />
    </>
  );
};

export default RollingWritePage;
