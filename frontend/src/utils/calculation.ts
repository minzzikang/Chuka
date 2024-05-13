// 펀딩 목표금액 퍼센트 계산
export const calculatePercent = (goalAmount: number, remainAmount: number) => {
  if (!goalAmount || !remainAmount) return 0;
  const percent = ((goalAmount - remainAmount) / goalAmount) * 100;
  return Math.round(percent);
};

// 디데이 계산
export const calculateDay = (eventDate: string) => {
  const today = new Date()
  const eventDateTime = new Date(eventDate);

  // const diffInTime = eventDateTime.getTime() - today.getTime();
  // const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
  // console.log('시간 :', diffInTime);
  // console.log('일 :' , diffInDays);

  // if (diffInDays <= 0) {
  //   return 'DAY';
  // }
  // return diffInDays;

  const formatToday = today.toISOString().split('T')[0]
  const formatEventDate = eventDateTime.toISOString().split('T')[0]

  if (formatToday !== formatEventDate) {
    return false
  } else {
    return true 
  }
};
