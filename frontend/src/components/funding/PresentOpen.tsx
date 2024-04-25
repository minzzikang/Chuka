import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import presentOpen from 'assets/lottie/presentOpen.json'
import { colors } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`


const P = styled.p`
    font-size: 14px;
    `

const Button = styled.button`
    width: 339px;
    height: 49px;
    background-color: ${colors.mainPink};
    color: white;


`

const PresentOpen = () => {

    const navigate = useNavigate()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: presentOpen,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
    }

    return (
        <Container>
            <Lottie options={defaultOptions} width={150} height={150} />
            <P>펀딩 등록이 신청되었습니다.</P>
            <P>등록이 완료되면 알림으로 안내드립니다.</P>
            <Button onClick={() => {navigate('/')}}>확인</Button>
        </Container>
    );
};

export default PresentOpen;