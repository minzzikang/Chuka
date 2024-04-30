import React from 'react';import styled from 'styled-components';
import { colors } from '@/styles/theme';
import { url } from 'inspector';

const Container = styled.div< {$thumbNail: boolean} >`
  background-image: ${(props) => (props.$thumbNail ? `url('/img/img_main_banner.png')` : "url('/img/img_chuka_info.png')" )};
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 150px;

`



const index = () => {
  const thumbNail = true
  
  return (
    <Container $thumbNail={thumbNail}>
      ssibal
    </Container>
  );
};

export default index;