import { colors } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


`
const EventWrap = styled.div`
display: flex;
    
`


const Title = styled.div`
    font-size: 1.8em;
    color: ${colors.mainPink};
    font-weight: 700;
`

const Desc = styled.div`
    font-size: 1em;

`

const SmallBtn = styled.button`
background-color: ${colors.mainPink};
color: #ffff;

`

const LargeBtn = styled.button`
width: 100%;
height: 49px;
background-color: ${colors.mainPink};
color: #ffff;
`

const TextArea = styled.textarea`
    
`

const PhoneInput = styled.input`
    
`

const index = () => {
    return (
        <Container>
            <Title>소중한 후기를 작성해주세요</Title>
        </Container>
    );
};

export default index;