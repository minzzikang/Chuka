import * as c from "@components/celebration/Celebration.styled";
import Button from "@common/button";
import TypeSection from "./TypeSection";
import CelebrationInfoSection from "./CelebrationInfoSection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEventReg } from "@/apis/event";

interface CelebrationProps {
  type: string;
  title: string;
  date: string;
  banner: File | null;
  theme: string;
  visibility: boolean;
}

const Index = () => {
  const navigate = useNavigate();
  const [regData, setRegData] = useState<CelebrationProps>({
    type: "birthday", // 이벤트 종류
    title: "",
    date: "",
    banner: null, // 대표 이미지
    theme: "cork_board", // 롤링페이퍼 배경
    visibility: true, // 노출 여부
  });

  const handleType = (newType: string) => {
    setRegData((prev) => ({
      ...prev,
      type: newType,
    }));
  };

  const handleTitle = (value: string) => {
    setRegData((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleDateChange = (selectedDate: Date) => {
    setRegData((prev) => ({
      ...prev,
      date: selectedDate.toISOString(),
    }));
  };

  const handleFileChange = (banner: File | null) => {
    setRegData((prev) => ({
      ...prev,
      banner: banner,
    }));
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

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("type", regData.type);
    formData.append("title", regData.title);
    formData.append("date", regData.date);
    formData.append("theme", regData.theme);
    formData.append("visibility", JSON.stringify(regData.visibility));

    if (regData.banner) {
      formData.append("banner", regData.banner);
    }

    try {
      const res = await createEventReg(formData);
      console.log(res);
      navigate("/celebrate/rolling");
    } catch (err) {
      console.error(err);
      navigate("/celebrate/rolling");
    }
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
      <Button children="등록하기" onClick={() => handleSubmit()} />
    </c.Container>
  );
};

export default Index;
