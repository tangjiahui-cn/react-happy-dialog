import React from "react";
import type { ModalFc } from "./useModal";

export type ModalInstance = {
  open: (params: any) => void;
  close: (...args: any) => void;
};

type RenderModalProps<Params> = {
  FC: ModalFc<Params>; // 弹窗组件
  getInstance: (ins: ModalInstance) => void;
  onOk?: (...args: any) => void;
  onCancel?: (...args: any) => void;
  onClose?: (...args: any) => void;
};

export function RenderModal<Params = any>(props: RenderModalProps<Params>) {
  const { FC } = props;
  // 弹窗是否打开
  const [visible, setVisible] = React.useState(false);
  // 弹窗是否渲染
  const [isRender, setIsRender] = React.useState(false);
  // 弹窗参数
  const [params, setParams] = React.useState<any>();

  // 打开弹窗
  function open(params?: any) {
    if (visible) {
      console.warn("modal has been already open.");
      return;
    }
    setParams(params);
    setVisible(true);
    setIsRender(true);
  }

  // 关闭弹窗
  function close(...args: any[]) {
    if (!visible) {
      console.warn("modal has been already closed.");
      return;
    }
    setVisible(false);
    props?.onClose?.(...args);
  }

  React.useEffect(() => {
    props?.getInstance?.({
      open,
      close,
    });
  }, []);

  if (!isRender) {
    return <></>;
  }

  return (
    <FC
      params={params}
      visible={visible}
      afterClose={() => {
        setIsRender(false);
      }}
      onOk={(...args: any) => {
        props?.onOk?.(...args);
        close(...args);
      }}
      onCancel={(...args: any) => {
        props?.onCancel?.(...args);
        close(...args);
      }}
    />
  );
}
