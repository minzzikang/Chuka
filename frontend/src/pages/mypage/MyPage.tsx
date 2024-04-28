import React from 'react';
import Navbar from '@common/navbar'
import ProfileSection from '@components/mypage/ProfileSection'
import SettingSection from '@components/mypage/SettingSection'
import Header from '@common/header'
import EventNull from '@components/mypage/EventNull'

const MyPage = () => {
    return (
        <div>
            <Header children='마이페이지' />
            <div style={{marginBottom:'50px'}}></div>
            <ProfileSection/>
            <SettingSection/>
            <EventNull/>
            <Navbar current='mypage'/>
        </div>
    );
};

export default MyPage;