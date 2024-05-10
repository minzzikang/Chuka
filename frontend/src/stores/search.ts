import { atom } from 'recoil'

export const keywordState = atom<string>({
  key: 'keywordState',
  default: '',
})