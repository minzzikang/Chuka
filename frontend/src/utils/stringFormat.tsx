// 앞 뒤 빈칸 제거
export const deleteBlank = (value: string) => {
  const re = /^\s+|\s+$/g;
  return value.replace(re, "");
};


// 제목 6글자 뒤부터는 ...
export const formattingTitle = (title: string) => {
  if (title.length > 6) {
    return `${title.slice(0, 6)}...`;
  }
  return title;
};