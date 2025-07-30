/**
 * 基本使用
 */
import { useModal } from "../hooks/useModal";
import { TestModal } from "./components/TestModal";
import { Button, message } from "antd";

export default function () {
  const modal = useModal(TestModal);
  return (
    <div style={{ padding: 12 }}>
      <Button
        type={"primary"}
        onClick={async () => {
          const value = await modal.open();
          message.success("ok:" + value);
        }}
      >
        打开弹窗
      </Button>
    </div>
  );
}
