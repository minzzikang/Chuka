import { getMessaging, getToken } from "firebase/messaging";
import { app } from "@/services/initFirebase";
import { sendFCMToken } from "@/apis/auth";

export const handleAllowNotification = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(getMessaging(app), {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });

      if (token) {
        sendFCMToken(token);
      } else {
        alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
      }
    } else if (permission === "denied") {
      // alert(
      //   "알림 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요."
      // );
    }
  } catch (err) {
    console.error("푸시 토큰 에러", err);
  }
};
