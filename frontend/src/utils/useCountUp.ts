import { useEffect, useState } from 'react'

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

// 숫자 올라가는 애니메이션
export default function useCountNum(end: number, start = 0, duration = 2000) {
  const [count, setCount] = useState(start)
  const frameRate = 1000 / 60
  const totalFrame = Math.round(duration / frameRate)

  useEffect(() => {
    let currentNumber = start
    const counter = setInterval(() => {
      const progress = easeOutExpo(++currentNumber / totalFrame)
      setCount(Math.round(end * progress))

      if (progress === 1) {
        clearInterval(counter)
      }
    }, frameRate)
  }, [end, frameRate, start, totalFrame])

  return count
}


// URL 클립보드에 복사하기
export const handleUrlCopy = async (url: string) => {
  try {
    await navigator.clipboard.writeText(`${url}`);
    alert("클립보드에 링크가 복사되었어요.");
  } catch (err) {
    console.log(err);
  }
};