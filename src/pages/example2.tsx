/**
 * 完全使用
 */
import React from "react";
import { antdModal, createUseModal, useModal } from "../hooks/useModal";
import { TestModal } from "./components/TestModal";
import { Button, Input, message, Modal, Space } from "antd";

// myModal
const useMyModal = createUseModal<{
  name: string;
}>((props) => {
  const { params } = props;
  return (
    <Modal
      {...antdModal(props)}
      title={"标题"}
      onOk={() => {
        props?.onOk?.();
      }}
      afterClose={props?.afterClose}
    >
      {params?.name || "-"}
    </Modal>
  );
});

export default function () {
  const [name, setName] = React.useState("abcde");
  // 通过createUseModal创建
  const myModal = useMyModal();
  // 通过 useModal创建
  const modal = useModal(TestModal, {
    onOk() {
      message.success("modal ok");
    },
    onCancel() {
      message.success("modal cancel");
    },
    onClose() {
      message.success("modal close");
    },
  });

  return (
    <Space style={{ padding: 12 }}>
      <Input
        allowClear
        value={name}
        placeholder={"请输入"}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        type={"primary"}
        onClick={() => {
          myModal.open({ name });
        }}
      >
        打开MyModal
      </Button>
      <Button
        type={"primary"}
        onClick={async () => {
          const value = await modal.open(
            { name },
            {
              onOk() {
                message.success("open ok");
              },
              onCancel() {
                message.success("open cancel");
              },
              onClose() {
                message.success("open close");
              },
            },
          );
          message.success("ok:" + value);
        }}
      >
        打开弹窗
      </Button>
    </Space>
  );
}
