import { Dispatch, SetStateAction } from "react";

export type RollingTypeSectionType = {
    type: string
    handleType: (value: string) => void
}

export type RollingInfoSectionType = {
    isVisible: boolean
    title: string
    handleTitle: (value: string) => void
    handleVisible: (value: boolean) => void
    handleDateChange: (value: Date) => void
}