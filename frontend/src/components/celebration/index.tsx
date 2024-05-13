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
  theme: string;
  visibility: boolean;
}

const Index = () => {
  const navigate = useNavigate();
  const [regData, setRegData] = useState<CelebrationProps>({
    type: "BIRTHDAY", // 이벤트 종류
    title: "",
    date: "",
    theme: "CORK_BOARD", // 롤링페이퍼 배경
    visibility: true, // 노출 여부
  });

  const [bannerImage, setBannerImage] = useState<File | null>(null);

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
    // 한국 시간으로 변환
    const koreaTime = selectedDate.toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
    });

    const koreaDate = new Date(koreaTime);
    const formattedDate = `${koreaDate.getFullYear()}-${(koreaDate.getMonth() + 1).toString().padStart(2, "0")}-${koreaDate.getDate().toString().padStart(2, "0")}`;

    setRegData((prev) => ({
      ...prev,
      date: formattedDate,
    }));
  };

  const handleVisible = (value: boolean) => {
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

  const handleFileChange = (file: File | null) => {
    setBannerImage(file);
  };

  const handleSubmit = async () => {
    if (!regData.title) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!regData.date) {
      alert("날짜를 선택해주세요.");
      return;
    }

    const formData = new FormData();

    formData.append("type", regData.type);
    formData.append("title", regData.title);
    formData.append("date", regData.date);
    formData.append("theme", regData.theme);
    formData.append("visibility", JSON.stringify(regData.visibility));

    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }

    try {
      const res = await createEventReg(formData);
      navigate(`/celebrate/rolling/${res.eventId}/${res.ageUri}`);
    } catch (err) {
      console.error(err);
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
      <Button onClick={handleSubmit}>등록하기</Button>
    </c.Container>
  );
};

export default Index;
