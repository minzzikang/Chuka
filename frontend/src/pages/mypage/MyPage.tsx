import Navbar from "@common/navbar";
import ProfileSection from "@components/mypage/ProfileSection";
import SettingSection from "@components/mypage/SettingSection";
import Header from "@common/header";
import { useRecoilValue } from "recoil";
import { userState } from "@stores/user";

const MyPage = () => {
  const userInfo = useRecoilValue(userState);

  return (
    <div style={{position:'relative'}}>
      <Header children="마이페이지" />
      <div style={{ marginBottom: "50px" }}></div>
      <ProfileSection 
      userInfo={userInfo}
      />
      <SettingSection
      userInfo={userInfo}
      />
      <Navbar current="mypage" />
    </div>
  );
};

export default MyPage;
