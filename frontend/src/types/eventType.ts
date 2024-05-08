export type myEventListType = {
    upcoming?: boolean  // 이벤트
    page: number
    size: number
    participant?: boolean  // 참여 여부 - false는 생성
}