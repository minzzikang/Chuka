

// 펀딩 목표금액 퍼센트 계산
export const calculatePercent = (goalAmount:number, remainAmount:number) => {
    if (!goalAmount || !remainAmount) return 0;
    const percent = ((goalAmount - remainAmount) / goalAmount) * 100;
    return Math.round(percent);
  };