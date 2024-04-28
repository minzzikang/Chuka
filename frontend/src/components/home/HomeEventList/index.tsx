import React from 'react';
import EventBanner from '@common/eventBanner'
import styled from 'styled-components';


const Container = styled.div`
  width: 100%;

`


const index = () => {
  return (
    <Container>
      <EventBanner />
    </Container>
  );
};

export default index;