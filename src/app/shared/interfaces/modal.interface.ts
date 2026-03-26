import { ModalType } from "../consts/modal.const";

export interface IModalData {
  title: string;
  description: string;
  type: ModalType;
  actionBtnText?: string;
  lightBg?: boolean;
  actionBtn?: () => unknown;
}
