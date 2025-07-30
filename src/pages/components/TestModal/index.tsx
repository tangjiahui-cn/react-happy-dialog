import { message, Modal } from "antd";
import React from "react";
import type { ModalFcProps } from "../../../hooks/useModal";

type Params = {
  name: string;
};

export function TestModal(props: ModalFcProps<Params>) {
  const { params } = props;

  React.useEffect(() => {
    message.warn("modal render");
  }, []);

  return (
    <Modal
      open={props?.visible}
      title={"标题"}
      onCancel={props?.onCancel}
      onOk={() => {
        props?.onOk?.("我是返回数据");
      }}
      afterClose={props?.afterClose}
    >
      一段文字 {params?.name}
    </Modal>
  );
}
