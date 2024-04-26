import * as c from "@components/celebration/Celebration.styled";

import Button from "@common/button";
import TypeSection from "./TypeSection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CelebrationInfoSection from "./CelebrationInfoSection";

interface CelebrationProps {
  type: string;
  title: string;
  date: string;
  banner: File | null;
  banner_thumbnail: string | null;
  theme: string;
  visibility: boolean;
  create_time: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [regData, setRegData] = useState<CelebrationProps>({
    type: "", // 이벤트 종류
    title: "",
    date: "",
    banner: null, // 대표 이미지
    banner_thumbnail: null,
    theme: "", // 롤링페이퍼 배경
    visibility: true, // 노출 여부
    create_time: "",
  });

  const handleType = (newType: string) => {
    setRegData((prev) => ({ ...prev, type: newType }));
  };

  const handleTitle = (value: string) => {
    setRegData((prev) => ({ ...prev, title: value }));
  };

  const handleDateChange = (selectedDate: Date) => {
    setRegData((prev) => ({
      ...prev,
      date: selectedDate.toISOString(),
    }));
  };

  const handleFileChange = (
    banner: File | null,
    banner_thumbnail: string | null
  ) => {
    setRegData((prev) => ({ ...prev, banner, banner_thumbnail }));
  };

  const handleVisible = (value: boolean) => {
    console.log(regData);
    setRegData((prev) => ({
      ...prev,
      visibility: value,
    }));
  };

  const handleTheme = (theme: string) => {
    setRegData((prev) => ({
      ...prev,
      theme: theme,
    }));
  };

  const handleSubmit = () => {
    navigate("/celebrate/rolling");
  };

  return (
    <c.Container>
      <TypeSection type={regData.type} handleType={handleType} />
      <CelebrationInfoSection
        isVisible={regData.visibility}
        title={regData.title}
        handleTitle={handleTitle}
        handleVisible={handleVisible}
        handleDateChange={handleDateChange}
        handleFileChange={handleFileChange}
        handleTheme={handleTheme}
        theme={regData.theme}
      />
      <Button children="등록하기" onClick={handleSubmit} />
    </c.Container>
  );
};

export default Index;
