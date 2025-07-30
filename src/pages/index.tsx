import React from "react";
import { useModal } from "../hooks/useModal";
import { TestModal } from "./components/TestModal";
import { Button } from "antd";

export default function () {
  const modal = useModal(TestModal, {
    onClose() {
      console.log("zz close");
    },
  });
  return (
    <div style={{ padding: 12 }}>
      <Button
        type={"primary"}
        onClick={async () => {
          await modal.open();
        }}
      >
        打开弹窗
      </Button>
    </div>
  );
}
