
import { ModalType } from '@/types/commonType'
import * as r from '@common/homeResModal/HomeResModal.styled'


const Index = ({ name, children, onClose }: ModalType) => {


  return (
    <>
      <r.BlackBox onClick={onClose} />
      <r.Container>
        <r.Wrap>
          <r.ModalName>{name}</r.ModalName>
          {children}
        </r.Wrap>
        <r.Backdrop>
          <img
            src={'/icon/icon_close_black.png'}
            alt=""
            onClick={onClose}
          />
        </r.Backdrop>
      </r.Container>
    </>
  )
}

export default Index
