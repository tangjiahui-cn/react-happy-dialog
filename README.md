# react-happy-dialog

一个优雅的 react 弹窗实现方案！

## 如何使用

### 方法1：使用 createUseModal 创建弹窗（推荐）
首先，创建弹窗：
```tsx
// MyModal.tsx
type Params = {
  name: string;
};

export const useMyModal = createUseModal<Params>((props) => {
  const { params } = props;
  return (
    <Modal
      {...antdModal(props)}
      title={"标题"}
    >
      {params?.name || "-"}
    </Modal>
  );
});
```
使用弹窗：
```tsx
import { useModal } from 'react-happy-dialog';
import { useMyModal } from './MyModal'

export default function App () {
  const modal = useMyModal();
  
  // 打开弹窗
  async function handleOpen () {
    await modal.open()
  }
  
  return (
    <Button onClick={handleOpen}>打开弹窗</Button>
  )
}
```
### 方法2：使用 useModal 使用弹窗
首先，创建弹窗：
```tsx
// TestModal.tsx
import { message, Modal } from "antd";
import React from "react";
import type { ModalFcProps } from "react-happy-dialog";

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
```
使用弹窗：
```tsx
import { useModal } from 'react-happy-dialog';
import { TestModal } from './TestModal'

export default function App () {
  const modal = useModal(TestModal)
  
  // 打开弹窗
  async function handleOpen () {
    await modal.open()
  }
  
  return (
    <Button onClick={handleOpen}>打开弹窗</Button>
  )
}
```
## 关于弹窗组件props定义
只要弹窗组件props符合下述类型，即可被`useModal`使用。
```tsx
// 弹窗组件 props 类型
export type ModalFcProps<Params = any> = {
  visible?: boolean;
  afterClose?: () => void;
  onCancel?: (data?: any) => void;
  onOk?: (data?: any) => void;
  params?: Params;
};
```