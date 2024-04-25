import { modalRefProps } from "../components/Modal";
import {  RefObject } from "react";

export interface ModalProps {
  modalRef: RefObject<modalRefProps>
  onSubmit?: () => void
}
