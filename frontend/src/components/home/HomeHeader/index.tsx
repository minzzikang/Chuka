import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;
`

const Img = styled.img`
    width: 49.66px;
    height: 51px;
`


const index = () => {
    return (
        <Container>
            <Img src="/img/img_logo.png" alt="" />
        </Container>
    );
};

export default index;