const KAKAO_JS_API_KEY = import.meta.env.VITE_KAKAO_JS_API_KEY;


if (!window.Kakao.isInitialized()) {
  window.Kakao.init(KAKAO_JS_API_KEY);
}

type shareEventKakaoType = {
  eventUrl:string 
  bannerThumbnailUrl: string
  title:string
  nickname:string
}

export const shareEventKakao = (props:shareEventKakaoType) => {
  const {eventUrl, bannerThumbnailUrl, title, nickname} = props

  if (window.Kakao) {
    const kakao = window.Kakao;

    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title, // 이벤트 제목
        description: `${nickname}님이 보낸 기념일을 축하해주세요 !`, // 이벤트 소개 문구
        imageUrl:
          bannerThumbnailUrl ? `${bannerThumbnailUrl}` : "https://i.ibb.co/phLPvFV/android-chrome-192x192.png", // 이벤트 대표 이미지 or 기본 이미지(ㅊㅋ)
        link: {
          mobileWebUrl: eventUrl ? `${eventUrl}`:'https://chuka.kr', // 이벤트 URL
          webUrl: eventUrl ? `${eventUrl}`:'https://chuka.kr', // 이벤트 URL
        },
      },

      buttons: [
        {
          title: "추카 서비스 이용하기",
          link: {
            mobileWebUrl: "https://chuka.kr", // 추카 앱 이동
            webUrl: "https://chuka.kr",
          },
        },
        {
          title: "이벤트 바로가기",
          link: {
            mobileWebUrl: eventUrl ? `${eventUrl}`:'https://chuka.kr', // 이벤트 링크
            webUrl: eventUrl ? `${eventUrl}`:'https://chuka.kr' //  
          },
        },
      ],
    });
  }
};
