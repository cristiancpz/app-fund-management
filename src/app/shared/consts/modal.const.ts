export const MODAL_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  CONFIRM: 'confirm'
}

export type ModalType = typeof MODAL_TYPE[keyof typeof MODAL_TYPE];
