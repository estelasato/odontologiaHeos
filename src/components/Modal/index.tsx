import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { Container, Content, Title } from "./styles";

export interface modalRefProps {
  open: (data?: any) => void;
  close: () => void;
  contains?: (target: Node) => boolean;
}

interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  width?: string;
  getValues?: (data?: any) => void;
  className?: string;
}

const ComponenteModal: React.ForwardRefRenderFunction<
  modalRefProps | null,
  ModalProps
  > = ({ getValues, children, title, width, className, ...rest }: ModalProps, ref) => {

  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useImperativeHandle(ref, () => ({
    open: (data) => {
      setInitialData(data)
      setIsOpen(true)
    },
    close: () => {
      setInitialData(null)
      getValues && getValues(null)
      setIsOpen(false)
    },
    getInitialData: () => initialData
  }));

  useEffect(() => {
    getValues && getValues(initialData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData])

  if (!isOpen) return null;

  const closeModal = () => {
    if (ref && "current" in ref && ref.current) {
      setInitialData(null)
      ref.current.close();
    }
  };

  return createPortal(
    <div>
      <Container className={className}>
        <Content
          {...rest}
          onClick={(e: any) => e.stopPropagation()}
          $width={width}
        >
          <Title>{title}</Title>
          <IoCloseOutline className="close-icon" onClick={closeModal}/>
          <div>{children}</div>
        </Content>
      </Container>
    </div>,
    document.body
  );
};

const Modal = forwardRef(ComponenteModal);

export default Modal;
