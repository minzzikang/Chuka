// 펀딩 목표금액 퍼센트 계산
export const calculatePercent = (goalAmount: number, remainAmount: number) => {
  if (!goalAmount || !remainAmount) return 0;
  const percent = ((goalAmount - remainAmount) / goalAmount) * 100;
  return Math.round(percent);
};

// 디데이 계산
export const calculateDay = (
  eventDate: string | undefined,
  creationTime: string | undefined
) => {
  //  예외처리
  if (!eventDate || !creationTime) {
    return 0;
  }

  const eventDateObj = new Date(eventDate);
  const creationDateObj = new Date(creationTime.split("T")[0]);
  const diff = eventDateObj.getTime() - creationDateObj.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};


export const BlurOpenDDay = ( eventDate:string) => {

  const eventDateObj = new Date(eventDate);
  const today = new Date()
  const diff = eventDateObj.getTime() - today.getTime() 

  console.log('오늘', today)
  console.log('dday와 오늘의 차이', diff);
  if (diff === 0) {
    return 1
  } else {
    return 0
  }
} 