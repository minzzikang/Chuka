import { userType } from '@/types/authType';
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'currentUser',
    storage: localStorage,
});

export const defaultUser = {
    userId: '',
    joinDate: '',
    nickname: '',
    profileImage: '',
    role: ''
}

export const userState = atom<userType>({
    key: 'userState',
    default: defaultUser,
    effects_UNSTABLE: [persistAtom],
})

