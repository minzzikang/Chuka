import { colors } from '@styles/theme'
import styled from 'styled-components'

export const BlackBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 300;
  width: 100vw;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

export const Wrap = styled.div`
  position: relative;
  z-index: 301;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  background-color: #fff;
  border-radius: 12px;
  /* width: 95vw;
  height: 100vw; */
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
    width: 0; /* Remove scrollbar space */
    height: 0;
    background: transparent; /* Optional: just make scrollbar invisible */
    -webkit-appearance: none;
  }
`

export const ModalName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 1em;
  height: 40px;
  font-size: 1.5em;
  font-weight: 600;
`

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
  img {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
`
