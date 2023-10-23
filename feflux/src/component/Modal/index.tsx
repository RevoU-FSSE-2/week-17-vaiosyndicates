import { Modal as Modals } from 'antd';
import { 
  Dispatch,
  SetStateAction,
} from 'react'

interface ModalFunc {
  open: boolean;
  handleOK:() => void;
  confirmLoading: boolean;
  handleCancel:() => void;
  category: string;
  name: string;
  setCategory: Dispatch<SetStateAction<string>> | undefined;
  setName: Dispatch<SetStateAction<string>> | undefined;
}

const Modal = ({open, handleOK, confirmLoading, handleCancel}: ModalFunc) => {


  return (
    <>
      <Modals
        title="Title"
        open={open}
        onOk={handleOK}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        
      </Modals>
    </>
  );
}


export default Modal;