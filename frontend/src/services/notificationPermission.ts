import { getMessaging, getToken } from "firebase/messaging";
import { app } from "@/services/initFirebase";
import { sendFCMToken } from "@/apis/auth";

export const handleAllowNotification = async () => {
  // console.log("토큰 받아보자..")
  try {
    const permission = await Notification.requestPermission();
    console.log("permission =>",permission)

    if (permission === "granted") {
      // console.log("===============import.meta.env.VITE_VAPID_KEY================>>",import.meta.env.VITE_VAPID_KEY)

      
      const token = await getToken(getMessaging(app), {
        vapidKey: "BE5_b5CoL_nOSuLlhrjTyPTIurMdPkjPG9ZqTL59m5hRL63FhnImiEip2GFTIvEl0YEjwNkPquUB7TqFVqoRevM",
      });

      console.log("===============token================>>",token)


      if (token) {
        sendFCMToken(token);
      } else {
        alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
      }
    } else if (permission === "denied") {
      alert(
        "알림 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요."
      );
    }
  } catch (err) {
    console.error("푸시 토큰 에러", err);
  }
};
