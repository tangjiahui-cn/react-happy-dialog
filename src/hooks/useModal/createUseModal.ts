import {
  type ModalCallbackOptions,
  type ModalFc,
  useModal,
  type ModalResultType,
} from "./useModal";

export type UseModalHook<Params> = (
  options?: ModalCallbackOptions,
) => ModalResultType<Params>;

export function createUseModal<Params = any>(
  FC: ModalFc<Params>,
): UseModalHook<Params> {
  return function (options?: ModalCallbackOptions): ModalResultType<Params> {
    return useModal(FC, options);
  };
}
