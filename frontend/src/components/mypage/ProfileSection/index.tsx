import { userType } from "@/types/authType";
import * as p from "./ProfileSection.styled";

interface userProps {
  userInfo: userType;
}

const index = (props: userProps) => {
  const { userInfo } = props;

  return (
    <p.Container>
      <p.Profile
        src={userInfo.profileImage || "/img/img_default_profile.png"}
      />
      <p.InfoWrap>
        <p.Name>{userInfo.nickname || "로그인 필요"}</p.Name>

        {userInfo.nickname ? (
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
