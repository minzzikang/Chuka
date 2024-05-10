import styled from "styled-components";
import SettingItem from "./SettingItem";
import { IoIosLock } from "react-icons/io";
import { GiPartyHat } from "react-icons/gi";
import { SlPresent } from "react-icons/sl";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { defaultUser, userState } from "@stores/user";
import { logout } from "@/apis/auth";
import { useNavigate } from "react-router";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 20px auto 0;
`;

const index = () => {
  const userInfo = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      sessionStorage.removeItem("selectedFileUrl");

      setUserInfo(defaultUser);
      localStorage.removeItem("currentUser");
      alert("로그아웃 되었습니다");
      navigate("/");
    } catch (err) {
      console.error("로그아웃 실패", err);
    }
  };

  return (
    <Container>
      <SettingItem
        title="계정"
        // text={userInfo.memberNo !== -1 ? userInfo.email : ''}
        icon={<IoIosLock />}
      />

      {userInfo ? (
        <SettingItem
          title="나의 ㅊㅋ"
          url="/mypage/celebrate"
          icon={<GiPartyHat />}
        />
      ) : undefined}
      {userInfo ? (
        <SettingItem
          title="나의 펀딩"
          url="/mypage/funding"
          icon={<SlPresent />}
        />
      ) : undefined}

      {userInfo ? (
        <SettingItem
          title="로그아웃"
          icon={<LuLogOut />}
          onClick={handleLogout}
        />
      ) : (
        <SettingItem title="로그인" url="/login" icon={<LuLogIn />} />
      )}

      <SettingItem
        title="회원탈퇴"
        // url="/mypage/funding"
        icon={<IoIosCloseCircleOutline />}
      />
    </Container>
  );
};

export default index;
