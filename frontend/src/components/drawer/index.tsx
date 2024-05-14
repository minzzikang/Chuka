import * as d from './Drawer.styled'
import { DrawerType } from './Drawer.styled'


const index = ({ isOpen, name, children, onClose }: DrawerType) => {
  return (
      <d.Container $isOpen={isOpen}>
        <d.BlackBox onClick={onClose} />
        <d.Wrap>
          <d.ModalName>{name}</d.ModalName>
          {children}
          <d.Backdrop>
            <img src="/icon/icon_close_black.png" alt="close" onClick={onClose} />
          </d.Backdrop>
        </d.Wrap>
      </d.Container>
  )
}

export default index
