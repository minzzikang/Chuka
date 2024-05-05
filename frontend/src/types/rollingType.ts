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
    handleFileChange: (banner: File | null) => void
    handleTheme: (value: string) => void
    theme: string
}