import * as p from "./ProfileSection.styled";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@stores/user";

const index = () => {
  const userInfo = useRecoilValue(userState);
  const accessToken = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!accessToken) {
      navigate("/login");
    }
  };

  return (
    <p.Container onClick={handleLogin}>
      <p.Profile
        src={
          userInfo
            ? `${userInfo.profile_image}` || "/img/img_default_profile.png"
            : "/img/img_default_profile.png"
        }
      />
      <p.InfoWrap>
        <p.Name>{userInfo ? userInfo.nickname : "로그인 필요"}</p.Name>

        {userInfo ? (
          <p.Description>오늘도 추카와 함께 축하해요</p.Description>
        ) : (
          <p.Description>
            원활한 서비스 이용을 위해 로그인을 해주세요
          </p.Description>
        )}
      </p.InfoWrap>
    </p.Container>
  );
};

export default index;
