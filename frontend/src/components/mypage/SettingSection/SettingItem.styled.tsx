import { colors } from '@/styles/theme'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: 55px;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  cursor: pointer;
`

export const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  width: 15px;
`

export const Left = styled.div`
  display: flex;
  font-weight: 500;
  span {
    margin-left: 20px;
  }
`

export const Right = styled.div`
  color: ${colors.gray};
  font-size: 0.8em;
  img {
    width: 5px;
    height: 10px;
  }
`
