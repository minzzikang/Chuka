import React from 'react';
import Navbar from '@common/navbar'
import AlarmList from '@/components/alarm/AlarmList';
import Header from '@common/header'

const AlarmPage = () => {
    return (
        <div>
            <Header children={'알림'}/>
            <AlarmList/>
            <Navbar current='alarm'/>
        </div>
    );
};

export default AlarmPage;