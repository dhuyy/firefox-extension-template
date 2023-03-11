import { useAsyncEffect } from '../../common/hooks/async-effect';

export const useSetOpenMark = (): void => {
  useAsyncEffect(
    async () => {
      await browser?.storage?.local
        .set({ hasOptionsPageBeenOpened: true })
        .catch(error => {
          console.error(error);
        });
    },
    () => {},
    []
  );
};
