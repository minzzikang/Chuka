








export type ModalType = {
  name: string;
  children?: React.ReactNode;
  onClose: () => void;
  onSelectColor?: (color: string) => void;
};


export type RecCardType = {
  imgUrl: string;
  title: string;
  amount: string;
};