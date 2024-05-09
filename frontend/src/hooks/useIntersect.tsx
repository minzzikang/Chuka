import { useRef, useCallback, useEffect } from "react";

// IntersectionObserver custom hook
type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;


const useIntersect = (
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit
) => {
  // 타겟 요소를 저장하기 위한 ref 선언
  const ref = useRef<HTMLDivElement>(null);
  // isIntersecting이 true면 콜백 실행, observe 호출 : 타겟 요소 관찰
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer); // isIntersecting : root와 target이 교차 상태인지 확인
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

export default useIntersect