/**
 * 使用方式
 *
 * （1）定义弹窗
 * const modal = useModal(TestModal)
 * const modal = useModal(TestModal, {
 *   onOk () {},
 *   onCancel () {},
 *   onClose () {},
 * })
 *
 * （2）使用弹窗
 * modal.open()
 * modal.open().then()
 * modal.open({}, {
 *   onOk () {},
 *   onCancel () {},
 *   onClose () {},
 * }).then()
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { type ModalInstance, RenderModal } from "./RenderModal";

// 返回结果类型
export type ModalResultType<Params = any, CloseData = any> = {
  children: null; // 占位符（以后考虑扩展）
  open: (params?: Params, options?: ModalCallbackOptions) => Promise<any>;
  close: (data?: CloseData) => Promise<any>;
};

// 弹窗组件 props 类型
export type ModalFcProps<Params = any> = {
  visible?: boolean;
  afterClose?: () => void;
  onCancel?: (data?: any) => void;
  onOk?: (data?: any) => void;
  params?: Params;
};

// 弹窗组件 React.FC
export type ModalFc<Params> = React.FC<ModalFcProps<Params>>;

// 弹窗组件回调函数 options
// （执行顺序：promise > open.config > options）
export type ModalCallbackOptions = {
  onOk?: (data: any[]) => void;
  onCancel?: (data: any[]) => void;
  onClose?: (data: any[], isOk: boolean) => void;
};

export function useModal<Params = any>(
  FC: ModalFc<Params>,
  options?: ModalCallbackOptions,
): ModalResultType<Params> {
  // 当前是否已打开弹窗（避免同时多次调用open()）
  const isOpening = React.useRef(false);
  // 卸载函数
  const unmountRef = React.useRef<() => void>();
  // 弹窗实例
  const modalIns = React.useRef<ModalInstance>();
  // useModal实时options
  const optionsRef = React.useRef<ModalCallbackOptions>();
  optionsRef.current = options;
  // open config
  const openConfigRef = React.useRef<{
    options?: ModalCallbackOptions;
    resolve?: (data: any) => void;
    reject?: (data: any) => void;
  }>();
  // close config
  const closeConfigRef = React.useRef<{
    resolve?: (data: any) => void;
  }>();

  // 获取弹窗实例
  async function ensureModalInstance() {
    return new Promise((resolve) => {
      if (modalIns.current) {
        return resolve(modalIns.current);
      }
      const div = document.createElement("div");
      const app = createRoot(div);
      document.body.appendChild(div);
      app.render(
        <RenderModal<Params>
          FC={FC}
          getInstance={(ins) => {
            resolve((modalIns.current = ins));
          }}
          onOk={(data: any) => {
            openConfigRef?.current?.resolve?.(data);
            openConfigRef?.current?.options?.onOk?.(data);
            optionsRef?.current?.onOk?.(data);
          }}
          onCancel={(data: any) => {
            openConfigRef?.current?.options?.onCancel?.(data);
            optionsRef?.current?.onCancel?.(data);
          }}
          onClose={(data: any, isOk: boolean) => {
            closeConfigRef?.current?.resolve?.(data);
            openConfigRef?.current?.options?.onClose?.(data, isOk);
            optionsRef?.current?.onClose?.(data, isOk);
            isOpening.current = false;
          }}
        />,
      );
      unmountRef.current = () => {
        app.unmount();
        div.remove();
      };
    });
  }

  /**
   * 打开弹窗
   * @param params 传参
   * @param options 配置项
   */
  async function openModal(
    params?: any, // 查询参数
    options?: ModalCallbackOptions, // 配置项
  ): Promise<any> {
    if (isOpening.current) {
      return;
    }
    isOpening.current = true;
    return new Promise(async (resolve, reject) => {
      try {
        await ensureModalInstance();
        openConfigRef.current = {
          options,
          resolve,
          reject,
        };
        modalIns.current?.open?.(params);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 关闭弹窗
   * @param data 回调返回值
   */
  async function closeModal(data: any) {
    return new Promise(async (resolve, reject) => {
      if (!modalIns.current) {
        return reject("modal not exist!");
      }
      try {
        closeConfigRef.current = {
          resolve,
        };
        modalIns.current.close(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 卸载
  React.useEffect(() => {
    return () => {
      unmountRef.current?.();
    };
  }, []);

  return {
    children: null,
    open: openModal,
    close: closeModal,
  };
}
