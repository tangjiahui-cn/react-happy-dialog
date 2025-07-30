import type { ModalFcProps } from "./useModal";

export function antdModal<Params = any>(props: ModalFcProps<Params>) {
  return {
    centered: true,
    visible: props?.visible,
    onCancel: props?.onCancel,
    onOk: props?.onOk,
    afterClose: props?.afterClose,
  };
}

export function antd5Modal<Params = any>(props: ModalFcProps<Params>) {
  return {
    centered: true,
    open: props?.visible,
    onCancel: props?.onCancel,
    onOk: props?.onOk,
    afterClose: props?.afterClose,
  };
}
