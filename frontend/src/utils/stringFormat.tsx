// 앞 뒤 빈칸 제거
export const deleteBlank = (value: string) => {
  const re = /^\s+|\s+$/g;
  return value.replace(re, "");
};


// 제목 6글자 뒤부터는 ...
export const formattingTitle = (title: string) => {
  if (title.length > 5) {
    return `${title.slice(0, 5)}...`;
  }
  return title;
};


// 제목 9글자 뒤부터는 ...
export const formattingMyPage = (title: string) => {
  if (title.length > 9) {
    return `${title.slice(0, 9)}...`;
  }
  return title;
};

// 내용 53글자 뒤부터는 ...
export const formattingComment = (comment: string) => {
  if (comment.length > 53) {
    return `${comment.slice(0, 53)}...`;
  }
  return comment;
};