import Navbar from "@common/navbar";
import RollingSelect from "@/components/celebration/Rolling/RollingRegInfo/RollingSelect";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const RollingBackgroundSelectPage = () => {
  const location = useLocation();

  const [regData, setRegData] = useState({
    shape: "",
    background_color: "",
    background_image: "",
  });

  useEffect(() => {
    console.log(regData);
  }, [regData, location.state]);

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
