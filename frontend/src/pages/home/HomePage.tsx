import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/stores/user";
import { fetchUserInfo } from "@/apis/auth";

const HomePage = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    fetchUserInfo()
      .then((data) => {
        setUser({ ...user, ...data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>{user.nickname}</h1>
    </>
  );
};

export default HomePage;
