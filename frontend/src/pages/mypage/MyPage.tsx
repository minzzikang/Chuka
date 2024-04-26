import React from 'react';
import Navbar from '@common/navbar'
import ProfileSection from '@components/mypage/ProfileSection'
import SettingSection from '@components/mypage/SettingSection'
import Header from '@common/header'

const MyPage = () => {
    return (
        <div>
            <Header children='마이페이지' />
            <ProfileSection/>
            <SettingSection/>
            <Navbar current='mypage'/>
        </div>
    );
};

export default MyPage;