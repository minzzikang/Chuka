import * as m from './SettingItem.styled'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'

export type MypageMenuItemType = {
    title: string
    imgSrc: string
    width: number
    height: number
    text?: string
    url?: string
    onClick?: () => void
  }
  



const SettingItem = (props: MypageMenuItemType) => {

  const { title, imgSrc, url, text, width, height, onClick } =
    props

  const navigate = useNavigate()

  const goPage = () => url && navigate(url)

  return (
    <m.Container onClick={url ? goPage : onClick}>
      <m.Left>
        <m.ImageWrap>
          <img
            src={imgSrc}
            alt=''
            width={width}
            height={height}
          />
        </m.ImageWrap>
        <span>{title}</span>
      </m.Left>
      <m.Right>
        {url ? (
          <img
            src={
              '/icon/icon_arrow_right_black.png'
            }
            alt=""
          />
        ) : (
          text
        )}
      </m.Right>
    </m.Container>
  )
}

export default SettingItem
