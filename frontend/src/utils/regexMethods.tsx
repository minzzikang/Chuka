// 앞 뒤 빈칸 제거
export const deleteBlank = (value: string) => {
  const re = /^\s+|\s+$/g;
  return value.replace(re, "");
};
