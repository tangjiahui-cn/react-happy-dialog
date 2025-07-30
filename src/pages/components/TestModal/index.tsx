import { message, Modal } from "antd";
import React from "react";

type Params = {
  name: string;
};

interface Props<Params = any> {
  visible?: boolean;
  afterClose?: () => void;
  onCancel?: () => void;
  onOk?: (data: string) => void;
  params?: Params;
}

export function TestModal(props: Props<Params>) {
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
