import { useRef, useCallback, useEffect } from "react";

// IntersectionObserver custom hook
type IntersectHandler = (
  entry: IntersectionObserverEntry, // observer가 관찰할 대상 // 1. entry의 값이 바뀐다!
  observer: IntersectionObserver
) => void;


// IntersectionObserver 옵션 인터페이스
interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}


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
        if (entry.isIntersecting) onIntersect(entry, observer); // isIntersecting : root와 target이 교차 상태인지 확인 여부에 따라 boolean을 return함
      });
    },
    [onIntersect]
  );
   // 2. entry의 값이 바뀌어 onIntersect가 변경되므로 
   // useCallback을 이용한 callback 함수 또한 업데이트.

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    // ref에 할당된 요소가 존재한다면 IntersectionObserver 객체를 생성하고 해당 요소의 관찰을 시작한다.
    return () => observer.disconnect();
    // 클린업 함수를 이용해 컴포넌트가 언마운트 될 경우 요소의 관찰을 중지한다.
  }, [ref, options, callback]);
  // 3. callback이 바뀌므로 이를 의존성 배열로 가진 useEffect hook 또한 
  // 다시 동작하기 때문에 다시 useRef가 할당한 요소의 관찰을 시작한다.

  return ref;
  // useIntersect hook에서 useRef를 반환해 컴포넌트에서 ref에 할당할 수 있도록 한다.
};

export default useIntersect