import { Dispatch, SetStateAction } from "react";

export type RollingTypeSectionType = {
    type: string
    // setType: Dispatch<SetStateAction<string>>
    handleType: (value: string) => void
}

export type RollingInfoSectionType = {
    isVisible: boolean
    title: string
    handleTitle: (value: string) => void
    handleVisible: (value: boolean) => void
}