import styled from "styled-components";
import SettingItem from "./SettingItem";
import { useSetRecoilState } from "recoil";
import { defaultUser, userState } from "@stores/user";
import { logout } from "@/apis/auth";
import { useNavigate } from "react-router";
import { userType } from "@/types/authType";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 20px auto 0;
`;

interface userProps {
  userInfo: userType;
}

const index = (props: userProps) => {
  const { userInfo } = props;
  const setUserInfo = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      setUserInfo(defaultUser);
      localStorage.removeItem("currentUser");
      alert("로그아웃 되었습니다");
      navigate("/");
    } catch (err) {
      console.error("로그아웃 실패", err);
    }
  };

  const isLoggedIn = userInfo && userInfo.userId;

  return (
    <Container>
      {isLoggedIn && (
        <>
          <SettingItem
            title="나의 ㅊㅋ"
            url="/mypage/celebrate"
            icon="/icon/icon_mypage1.png"
            width={13}
            height={15}
          />
          <SettingItem
            title="나의 펀딩"
            url="/mypage/funding"
            icon="/icon/icon_mypage2.png"
            width={15}
            height={15}
          />
          <SettingItem
            title="로그아웃"
            icon="/icon/icon_mypage3.png"
            onClick={handleLogout}
            width={15}
            height={15}
          />
        </>
      )}
      {!isLoggedIn && (
        <SettingItem
          title="로그인"
          url="/login"
          icon="/icon/icon_mypage4.png"
          width={15}
          height={15}
        />
      )}
    </Container>
  );
};

export default index;
