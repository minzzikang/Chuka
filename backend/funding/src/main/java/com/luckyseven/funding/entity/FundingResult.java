package com.luckyseven.funding.entity;

/**
 * 2024-04-26 10:49
 * 디비가 아닌 백엔드에서 funding을 관리해야할 상태가 생겨서 생성함
 * 2024-05-11 21:35
 * 결국 스케줄링 돌리기 때문에 DB 컬럼에 추가해서 관리함
 */
public enum FundingResult {
    ONGOING,
    SUCCESS,
    COMPLETE,

}
