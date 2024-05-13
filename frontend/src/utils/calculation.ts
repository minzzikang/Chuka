// 펀딩 목표금액 퍼센트 계산
export const calculatePercent = (goalAmount: number, remainAmount: number) => {
  if (!goalAmount || !remainAmount) return 0;
  const percent = ((goalAmount - remainAmount) / goalAmount) * 100;
  return Math.round(percent);
};

// 디데이 계산
export const calculateDay = (eventDate: string) => {
  const today = new Date()
  today.setHours(today.getHours() + 9)  // utc 시간대에서 우리나라 시간대로 맞춤

  const eventDateTime = new Date(eventDate);
  eventDateTime.setHours(eventDateTime.getHours() + 9)

  // 날짜 정보만 비교하기 위해 'YYYY-MM-DD' 포맷으로 변환
  const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  const formattedEventDate = `${eventDateTime.getFullYear()}-${(eventDateTime.getMonth() + 1).toString().padStart(2, '0')}-${eventDateTime.getDate().toString().padStart(2, '0')}`;

  // 다시 Date 객체로 변환하여 시간 차이 계산
  const compareToday = new Date(formattedToday);
  const compareEventDate = new Date(formattedEventDate);


  const diffInTime = compareEventDate.getTime() - compareToday.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) {
    return 'DAY';
  }
  return diffInDays;
};
