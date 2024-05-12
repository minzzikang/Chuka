import * as m from "@common/modal/Modal.styled";
import { ModalType } from "@/types/commonType";

const index = ({ name, children, onClose }: ModalType) => {
  return (
    <>
      <m.Container>
        <m.BlackBox onClick={onClose} />
        <m.Wrap>
          <m.ModalName>From {name}</m.ModalName>
          <div
            style={{
              // width: "100vw",
              height: "90vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {children}
          </div>
          <m.Backdrop>
            <img
              src="/icon/icon_close_black.png"
              alt="close"
              onClick={onClose}
            />
          </m.Backdrop>
        </m.Wrap>
      </m.Container>
    </>
  );
};

export default index;
