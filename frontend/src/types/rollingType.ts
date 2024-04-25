import { Dispatch, SetStateAction } from "react";

export type RollingTypeSectionType = {
    type: string
    setType: Dispatch<SetStateAction<string>>
}