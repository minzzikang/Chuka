import { Link } from 'react-router-dom'
import { colors, sizes } from '@styles/theme'
import styled from 'styled-components'

export const Container = styled.footer`
  position: fixed;
  width: 100%;
  min-width: ${sizes.minWidth};
  max-width: ${sizes.maxWidth};
  bottom: 0;
  z-index: 100;
  border-top: 1px solid '#f7f7f7'; 

  background-color: '#fff';
  height: 60px;
  box-shadow: 6px 4px 18px 3px rgba(0, 0, 0, 0.11);
  @media only screen and (min-width: 430px) {
    width: 430px;
  }
  @media only screen and (min-width: 600px) {
    width: 375px;
  }
`

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 0 9px;
`

export const Item = styled(Link)`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Icon = styled.img``

export const Label = styled.div<{ $active: boolean }>`
  font-size: 0.7em;
  font-weight: 700;
  margin-top: 6px;
  color: ${props => (props.$active ? colors.mainPink : colors.gray)};
`
