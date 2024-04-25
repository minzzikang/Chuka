import React from 'react';
import styled from 'styled-components';
import { colors } from '@/styles/theme';
import MessageItem from './MessageItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;

`

const Wrap = styled.div`
  
`

const Text = styled.div`
  font-size: 1em;
  color: ${colors.mainPink};
`

const Intro = styled.label`
background-color: #fff;

  
`

const MessageList = styled.input`
  
`


const index = () => {
  return (
    <div>
      <MessageItem/>
    </div>
  );
};

export default index;